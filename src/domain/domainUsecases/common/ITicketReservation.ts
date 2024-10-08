import { IResponse2 } from "..";
import { Role } from "../../../utils/enum";
import { IReservedSeats } from "../../entities/theaters";

export interface IPaymentResponse extends IResponse2 {
  data: {
    clientSecret: string
    paymentIntentId: string
  }
}

interface ITicketReservation {
  execute: (role: Role, _id: string, showId: string, payload: IReservedSeats) => Promise<IPaymentResponse>
}

export {
  ITicketReservation
}