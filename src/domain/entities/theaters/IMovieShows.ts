import { ObjectId } from "mongoose"

interface IMovieShow extends Document {
  theaterId: ObjectId;
  movieId: ObjectId;
  screenId: ObjectId  
  format:string,
  language:string
  showTime: string, 
  endTime: string,
}
export {
  IMovieShow
}