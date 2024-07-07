import { ObjectId } from "mongoose";
import { Status } from "../common";

interface UserEntity {
  _id?: ObjectId;
  name: string;
  email: string;
  mobile_number: number;
  password: string;
  verified?: boolean;
  status?: Status
}

export {
  UserEntity,
} 