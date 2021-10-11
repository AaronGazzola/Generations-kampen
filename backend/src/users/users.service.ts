import * as moment from 'moment';
import * as crypto from 'crypto';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SeedUserDto } from './dto/seed-user.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import ErrorResponse from 'src/shared/errorResponse';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import sendEmail from 'src/shared/sendEmail';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  async seedUser(seedUserDto: SeedUserDto): Promise<void> {
    const { password, email } = seedUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      password: hashedPassword,
      email,
    });

    try {
      await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  async getUser(_id: string) {
    try {
      const user = await this.userModel.findById(_id);

      if (!user) {
        throw new ErrorResponse('No user found', 404);
      }
      const payload = { username: user.email, sub: user._id };
      return {
        user,
        success: true,
        token: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRE,
        }),
      };
    } catch (error) {
      throw new ErrorResponse(error.message, 500);
    }
  }

  async validateUser(emailParam: string, password: string): Promise<User> {
    const email = emailParam.toLowerCase();
    const user = await this.userModel.findOne({ email }).select('+password');

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    const returnUser = await this.userModel.findById(user._id);

    if (valid) {
      return returnUser;
    }

    return null;
  }

  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user)
      throw new ErrorResponse('Could not find a user with that email', 404);

    // generate token and hash
    const token = crypto.randomBytes(20).toString('hex');
    const hash = crypto.createHash('sha256').update(token).digest('hex');
    // add hash to user
    user.resetPasswordToken = hash;
    user.resetPasswordExpire = moment().add(1, 'd').toDate();
    // get base URL from request protocol and host domain
    const baseUrl = `${this.req.protocol}://${
      process.env.NODE_ENV === 'production'
        ? this.req.get('host')
        : 'localhost:3000'
    }`;
    const actionLink = `${baseUrl}/reset-password/${token}`;

    // send change email token to user via email
    await sendEmail({
      type: 'RESET_PASSWORD',
      actionLink,
      user,
      baseUrl,
      buttonText: 'Reset password',
    });

    await user.save();

    return {
      success: true,
      email,
    };
  }

  async resetPassword(token: string, password: string) {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await this.userModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: {
        $gt: moment().toDate(),
      },
    });

    if (!user) {
      throw new ErrorResponse('Invalid password reset token', 401);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Set new password
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    const payload = { username: user.email, sub: user._id };
    return {
      success: true,
      user,
      token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRE,
      }),
    };
  }
}
