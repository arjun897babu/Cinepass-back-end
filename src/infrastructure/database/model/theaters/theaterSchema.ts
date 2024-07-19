import mongoose, { model, Schema, ObjectId } from "mongoose";
import { ITheaters } from "../../../../domain/entities/theaters";

const theaterSchema = new Schema<ITheaters>({
  theater_Name: {
    type: String,
    required: true,
    unique: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  theater_license: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  location: {
    type: String,
    default:null
  },
  images: {
    type: [String],
  
  }
})

export const Theaters = model<ITheaters>('Theaters', theaterSchema)