import { ObjectId } from "mongoose";

interface UserEntity {
  _id?: ObjectId;
  name: string;
  email: string;
  mobile_number: number;
  password: string;
  verified?: boolean;
  status?: boolean;
  profile_picture?:string,
  location?:string
}

export {
  UserEntity,
} 