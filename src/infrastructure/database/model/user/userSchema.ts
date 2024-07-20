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
  },
  mobile_number: {
    type: Number,

  },
  password: {
    type: String,
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

  }
});

export const Users = model<UserEntity>('Users', userSchema);


