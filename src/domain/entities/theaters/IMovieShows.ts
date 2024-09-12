import { Document, ObjectId } from "mongoose"

export interface IReservedSeats {
  bookingDate: Date;
  reservedSeats: string[];
}

interface IMovieShow extends Document {
  theaterId: ObjectId;
  movieId: ObjectId;
  screenId: ObjectId;
  openingDate: Date;
  format: string;
  language: string;
  showTime: string;
  endTime: string;
  listed: boolean;
  reserved: IReservedSeats[]
  allowCancelation: boolean;
  cancelationDeadline: number;
  advanceBookingPeriod: number;
  slug:string
}
export {
  IMovieShow
}