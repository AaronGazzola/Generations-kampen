import { Document } from 'mongoose';

export interface User extends Document {
  password: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  email: string;
}
