import { ObjectId } from "mongoose"
import { ApprovalStatus } from "../common";


interface ITheaterOwnerEntity {
  _id?: ObjectId;
  name: string;
  email: string;
  mobile_number: number;
  password: string;
  verified?: boolean;
  status?: boolean;
  adhaar_number: number;
  theater_name: string;
  theater_license: string;
  approval_status?: ApprovalStatus;
  address: string
  city:string
}


export {
  ITheaterOwnerEntity
}