 
import { Document } from "mongoose";
import { ApprovalStatus } from "../../../utils/enum";


interface ITheaterOwnerEntity extends Document {
   
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
  city:string,
  image?:string
  slug?:string
}


export {
  ITheaterOwnerEntity
}