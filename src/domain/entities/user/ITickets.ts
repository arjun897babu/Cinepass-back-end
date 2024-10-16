import { Document } from "mongoose"; 
import { BookingStatus } from "../../../utils/enum";

interface ITickets extends Document {

  userId: string;
  theaterId:string;
  showId: string;
  screenId:string;
  paymentId: string;//paymentIntentId of the transaction
  bookingDate: Date;
  seats: string[];
  bookingStatus: BookingStatus;
  bookingCode?:string
}

export {
  ITickets
}