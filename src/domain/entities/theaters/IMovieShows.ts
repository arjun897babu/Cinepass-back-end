import { Document, ObjectId } from "mongoose"

interface IMovieShow extends Document {
  theaterId: ObjectId;
  movieId: ObjectId;
  screenId: ObjectId
  opening_date?: Date
  format: string,
  language: string
  showTime: string,
  endTime: string,
  listed: boolean
}
export {
  IMovieShow
}