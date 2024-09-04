import { Document, ObjectId } from "mongoose"

interface IReservedSeats {
  booking_date: Date
  reserved_seats: string[]
}

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
  reserved: IReservedSeats[]
}
export {
  IMovieShow
}