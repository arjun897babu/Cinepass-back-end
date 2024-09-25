import { IResponse2 } from "..";
import { Role } from "../../../utils/enum";
import { IReservedSeats } from "../../entities/theaters";

interface ITicketReservationResponse extends IResponse2 {
  data: {
    clientSecret: string
  }
}

interface ITicketReservation {
  execute: (role: Role, _id: string, showId: string, payload: IReservedSeats) => Promise<ITicketReservationResponse>
} 

export {
  ITicketReservation
}