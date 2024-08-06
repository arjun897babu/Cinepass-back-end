import { ObjectId, Types } from "mongoose"

interface IMovieShow extends Document {
  theaterId: ObjectId;
  movieId: ObjectId;
  screenId: ObjectId  
  showTime: string,
  endTime: string,
}
export {
  IMovieShow
}