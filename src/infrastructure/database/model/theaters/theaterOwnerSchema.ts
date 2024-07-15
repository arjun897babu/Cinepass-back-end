import { model, Schema } from "mongoose";
import { Status } from "../../../../domain/entities/common";
import { ITheaterOwnerEntity } from "../../../../domain/entities/theaters";

const theaterOwnerSchema = new Schema<ITheaterOwnerEntity>({
  
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
      default: Status.ACTIVE,
    },
    adhaar_number:{
      type:Number,
      required:true,
    },
    theater_name:{
      type:String,
      required:true
    },
    theater_license:{
      type:String,
      required:true,
      unique:true
    }
})


export const TheaterOwner = model<ITheaterOwnerEntity>('TheaterOwner', theaterOwnerSchema)