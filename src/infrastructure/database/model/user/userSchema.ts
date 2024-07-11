import { model, Schema } from 'mongoose';
import { UserEntity } from '../../../../domain/entities/user/IUserEntity';
import { Status } from '../../../../domain/entities/common';
const userSchema = new Schema<UserEntity>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile_number: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["active", "blocked"],
    default: Status.active,
  },
  profile_picture: {
    type: String,
    default:null
  }
});

export const Users = model<UserEntity>('User', userSchema);


