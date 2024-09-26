import { BookingStatus } from "../../../../utils/enum"
import { Tickets } from "../../model/user/ticket-schema"

const updateTicketStatus = async (paymentIntent: string) => {
  try {
    await Tickets.findOneAndUpdate({ paymentId: paymentIntent },
      {
        $set: {
          bookingStatus: BookingStatus.CANCELED
        }
      }
    )

  } catch (error) {
    throw error
  }
}

export {
  updateTicketStatus
}