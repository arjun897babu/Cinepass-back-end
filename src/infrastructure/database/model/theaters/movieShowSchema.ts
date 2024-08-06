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
  }, showTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const MovieShow = model<IMovieShow>('MovieShow', movieShowSchema);
