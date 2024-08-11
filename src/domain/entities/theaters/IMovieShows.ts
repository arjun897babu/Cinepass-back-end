import { ObjectId } from "mongoose"

interface IMovieShow extends Document {
  theaterId: ObjectId;
  movieId: ObjectId;
  languguage:string
  screenId: ObjectId  
  showTime: string,
  endTime: string,
}
export {
  IMovieShow
}