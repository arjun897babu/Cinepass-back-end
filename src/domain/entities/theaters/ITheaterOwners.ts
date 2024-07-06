import { ObjectId } from "mongoose"
import { UserEntity } from "../user/IUserEntity";


interface TheaterOwnerEntity extends UserEntity {
  adhaar_number: number;
  theater_license_number: string;
}


export {
  TheaterOwnerEntity
}