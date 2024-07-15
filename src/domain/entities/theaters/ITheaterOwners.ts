import { ObjectId } from "mongoose"
import { UserEntity } from "../user/IUserEntity";


interface ITheaterOwnerEntity extends UserEntity {
  adhaar_number: number;
  theater_name:string;
  theater_license: string;
}


export {
  ITheaterOwnerEntity
}