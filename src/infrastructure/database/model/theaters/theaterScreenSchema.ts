import { model, Schema } from "mongoose";
import { ITheaterScreen } from "../../../../domain/entities/theaters";

const theaterScreenSchema = new Schema<ITheaterScreen>({
  screen_name: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  seating_capacity: {
    type: Number,
    required: true,

  },
  rows: {
    type: Number,
    required: true

  },
  column: {
    type: Number,
    required: true
  },
  chargePerSeat: {
    type: Number,
    required: true
  }
});

export const TheaterScreen = model<ITheaterScreen>('TheaterScreen', theaterScreenSchema)