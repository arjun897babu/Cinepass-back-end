import { model, Schema } from "mongoose";
import { Status } from "../../../../domain/entities/common";
import { TheaterOwnerEntity } from "../../../../domain/entities/theaters/ITheaterOwners";

const theaterOwnerSchema = new Schema<TheaterOwnerEntity>({
  
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
      unique: true,
    },
    password: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: Status.active,
    },
    adhaar_number:{
      type:Number,
      required:true,
      unique:true,
    },
    theater_license_number:{
      type:String,
      required:true,
      unique:true
    }
})


export const TheaterOwner = model<TheaterOwnerEntity>('TheaterOwner', theaterOwnerSchema)