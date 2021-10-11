import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SeedUserDto } from './dto/seed-user.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import ErrorResponse from 'src/shared/errorResponse';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
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

  async login(user: User) {
    const payload = { username: user.email, sub: user._id };

    return {
      user,
      success: true,
      token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRE,
      }),
    };
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
}
