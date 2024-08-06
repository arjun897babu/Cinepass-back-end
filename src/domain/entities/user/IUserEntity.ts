import { ObjectId } from "mongoose";

interface UserEntity {
  _id?: ObjectId;
  name: string;
  email: string;
  mobile_number?: number;
  password: string|null;
  verified?: boolean;
  status?: boolean;
  profile_picture?:string,
  city?:string,
  isGoogleAuth?: boolean,
  googleId?:string
}

export {
  UserEntity,
} 