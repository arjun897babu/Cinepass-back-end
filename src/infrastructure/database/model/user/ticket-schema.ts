import { model, Schema } from "mongoose";
import { ITickets } from "../../../../domain/entities/user/ITickets";
import { BookingStatus } from "../../../../utils/enum";
import { generateTicketCode } from "../../../../utils/paymentHelper";

const ticketSchema = new Schema<ITickets>({
  userId: {
    type: String,
    required: true
  },
  theaterId: {
    type: String,
    required: true
  },
  screenId: {
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
  ],
  bookingCode: {
    type: String
  }
});

ticketSchema.pre(('save'), function (next) {
  if (!this.bookingCode) {
    this.bookingCode = generateTicketCode(this.bookingDate, this.userId)
  }
  next()
})

export const Tickets = model('Tickets', ticketSchema) 