import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<User> {
    const email = username.toLowerCase();
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

  async login(user: User) {
    const payload = { username: user.email, sub: user._id };

    return {
      user,
      success: true,
      token: this.jwtService.sign(payload),
    };
  }
}
