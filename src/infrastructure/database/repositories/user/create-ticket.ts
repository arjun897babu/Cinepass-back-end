import { ITickets } from "../../../../domain/entities/user/ITickets"
import { Tickets } from "../../model/user/ticket-schema"

const createTickets = async (data: Pick<ITickets, 'userId' | 'showId'|'bookingDate'|'bookingStatus'|'seats'|'paymentId'>) => {
  try {
    const ticket = await Tickets.create(data)
    return ticket
  } catch (error) {
    throw error
  }
}

export {
  createTickets
}