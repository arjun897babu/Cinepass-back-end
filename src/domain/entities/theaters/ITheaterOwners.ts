import { ObjectId } from "mongoose"
import { ApprovalStatus, Status } from "../common";


interface ITheaterOwnerEntity {
  _id?: ObjectId;
  name: string;
  email: string;
  mobile_number: number;
  password: string;
  verified?: boolean;
  status?: Status;
  adhaar_number: number;
  theater_name:string;
  theater_license: string;
  approval_status?:ApprovalStatus;
}


export {
  ITheaterOwnerEntity
}