import { IUpdateVerification } from "../../../domain/domainUsecases";
import { ITheaterTicketDataResponse } from "../../../domain/domainUsecases/common";
import { OTPEntity } from "../../../domain/entities/common";
import { IMovieShow, IReservedSeats, ITheaterScreen } from "../../../domain/entities/theaters";
import { ITheaterOwnerEntity } from "../../../domain/entities/theaters/ITheaterOwners"
import { IGetScreenCount, IGetShowCountByScreen, IGetTicketCount, IResetPassword, IRevenueResponse, ITheaterDetailResponse, RevenueByFilter, TheaterOwnerProfile, TheaterProfile, TicketFilter } from "../../../utils/interface";

interface ITheaterRepositories {
  createTheaterOwner: (data: ITheaterOwnerEntity) => Promise<ITheaterOwnerEntity | null>
  findTheaterOwnerByEmail: (email: string) => Promise<ITheaterOwnerEntity | null>
  findTheaterOwnerOTP: (email: string) => Promise<OTPEntity | null>
  verifyTheaterOwner: (data: IUpdateVerification) => Promise<boolean>
  createTheatersOTP: (email: string, otp: string) => Promise<void>
  findTheaterOwnerById: (_id: string) => Promise<ITheaterOwnerEntity | null>;
  resetPasswordTheaters: (payload: IResetPassword) => Promise<boolean>
  updateTheater: (_id: string, payload: Partial<TheaterProfile>) => Promise<ITheaterOwnerEntity | null>;
  // updateTheaterOwner: (_id: string, payload: TheaterOwnerProfile) => Promise<ITheaterOwnerEntity | null>;
  createTheaterScreen: (_id: string, payload: ITheaterScreen) => Promise<ITheaterScreen>;
  getAllTheaterScreen: (_id: string, amenity?: string) => Promise<ITheaterScreen[] | []>;
  createMovieShows: (_id: string, payload: Omit<IMovieShow, 'theaterId'>) => Promise<IMovieShow>
  updateMovieShow: (showId: string, payload: IMovieShow) => Promise<boolean>;
  deleteMovieshow: (showId: string) => Promise<boolean>
  deleteTheaterScreen: (screenId: string) => Promise<boolean>
  updateTheaterScreen: (screenId: string, payload: ITheaterScreen) => Promise<ITheaterScreen | null>
  addReservedSeats: (showId: string, data: IReservedSeats) => Promise<void>
  removeReservedSeats: (showId: string, data: IReservedSeats) => Promise<void>
  getTheaterTicketData: (_id: string, pageNumber: number, filter?: TicketFilter) => Promise<ITheaterTicketDataResponse>
  getScreenCount: (theaterId: string) => Promise<IGetScreenCount>
  getTicketCount: (theaterId: string) => Promise<IGetTicketCount>
  getShowCountByScreen: (theaterId: string) => Promise<IGetShowCountByScreen[]>
  getRevenueByScreen:(theaterId:string,filter:RevenueByFilter)=>Promise<IRevenueResponse>
}

export {
  ITheaterRepositories
}