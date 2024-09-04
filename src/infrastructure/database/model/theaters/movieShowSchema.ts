import { model, Schema, Types } from "mongoose";
import { IMovieShow } from "../../../../domain/entities/theaters";
import { timeStamp } from "console";

const movieShowSchema = new Schema<IMovieShow>({
  theaterId: {
    type: Types.ObjectId,
    required: true,
    ref: 'TheaterOwner'
  },
  movieId: {
    type: Types.ObjectId,
    required: true,
    ref: 'TheaterMovie'
  },
  screenId: {
    type: Types.ObjectId,
    required: true,
    ref: 'TheaterScreen'
  },
  format: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  showTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  opening_date: {
    type: Date
  },
  listed: {
    type: Boolean,
    default: true
  },
  reserved: [
    {
      booking_date: {
        type: Date,
        required: true
      },
      reserved_seats: [
        {
          type: String,
          required: true
        }
      ]
    }
  ]
}, {
  timestamps: true
});

export const MovieShow = model<IMovieShow>('MovieShow', movieShowSchema);
