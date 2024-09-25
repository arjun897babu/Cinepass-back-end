import { model, Schema } from "mongoose";
import { ITickets } from "../../../../domain/entities/user/ITickets";
import { BookingStatus } from "../../../../utils/enum";

const ticketSchema = new Schema<ITickets>({
  userId: {
    type: String,
    required: true
  },
  theaterId: {
    type: String,
    required: true
  },
  showId: {
    type: String,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  bookingStatus: {
    type: String,
    enum: Object.values(BookingStatus),
    default: BookingStatus.BOOKED
  },
  bookingDate: {
    type: Date,
    required: true
  },
  seats: [
    {
      type: String
    }
  ]
});

export const Tickets = model('Tickets', ticketSchema) 