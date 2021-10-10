import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: false,
    minlength: 6,
    select: false,
  },
  resetPasswordToken: { type: String, select: false },
  resetPasswordExpire: Date,
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
});
