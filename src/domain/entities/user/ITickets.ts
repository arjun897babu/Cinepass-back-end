import { Document } from "mongoose"; 
import { BookingStatus } from "../../../utils/enum";

interface ITickets extends Document {
  userId: string;
  theaterId:string;
  showId: string;
  paymentId: string;//paymentIntentId of the transaction
  bookingDate: Date;
  seats: string[];
  bookingStatus: BookingStatus;
}

export {
  ITickets
}