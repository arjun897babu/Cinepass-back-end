import { model, Schema } from 'mongoose';
import { UserEntity } from '../../../../domain/entities/user/IUserEntity';
const userSchema = new Schema<UserEntity>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index:true
  },
  mobile_number: {
    type: Number,
    default: null

  },
  password: {
    type: String,
    default: null
  },
  verified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
  profile_picture: {
    type: String,
    default: null
  },
  location: {
    type: String,
    default: null
  },
  isGoogleAuth: {
    type: Boolean,
    default: false
  },
  googleId: {
    type: String,
    default: null
  }
});

export const Users = model<UserEntity>('Users', userSchema);


