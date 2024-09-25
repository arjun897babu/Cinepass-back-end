import { IResponse2 } from "..";
import { Role } from "../../../utils/enum";
import { IGetSingleShow, TicketFilter } from "../../../utils/interface";
import { IPayment } from "../../entities/user/IPayment";
import { ITickets } from "../../entities/user/ITickets";
import { UserEntity } from "../../entities/user/IUserEntity";


interface ITheaterTicketData extends IUserTicketData {
  userinfo: Pick<UserEntity, '_id' | 'name' | 'email' | 'mobile_number' | 'profile_picture'>
}

export interface ITheaterTicketDataResponse {
  maxPage: number,
  data: ITheaterTicketData[]
}   


interface IUserTicketData {
  paymentInfo: Pick<IPayment, 'extraCharge' | 'serviceCharge' | 'status' | 'totalAmount' | '_id'|'paymentIntentId'>;
  TicketInfo: Pick<ITickets, '_id' | 'bookingStatus' | 'bookingDate' | 'seats'>;
  movieInfo: Pick<IGetSingleShow, 'movie'>;
  theaterInfo: Pick<IGetSingleShow, 'theater'>;
  screenInfo: Pick<IGetSingleShow, 'screen'>;
  showInfo: Pick<IGetSingleShow, 'show'>
}

export interface IUserTicketDataResponse {
  maxPage: number,
  data: IUserTicketData[]
}

interface IGetTicketDataResponse extends IResponse2 {
  data: IUserTicketDataResponse | ITheaterTicketDataResponse
}

interface IGetTicketData {
  execute: (role: Role, _id: string, pageNumber: number, filer?: TicketFilter) => Promise<IGetTicketDataResponse>
}


export { IGetTicketData }