import { model, Schema } from "mongoose";
import { ApprovalStatus } from "../../../../domain/entities/common";
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
    required: true
  },
  password: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: true
  },
  adhaar_number: {
    type: Number,
    required: true,
  },
  theater_name: {
    type: String,
    required: true
  },
  theater_license: {
    type: String,
    required: true,
  },
  approval_status: {
    type: String,
    enum: Object.values(ApprovalStatus),
    default: ApprovalStatus.PENDING
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }

})


export const TheaterOwner = model<ITheaterOwnerEntity>('TheaterOwner', theaterOwnerSchema)