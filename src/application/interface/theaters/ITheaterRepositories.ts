import { IUpdateVerification } from "../../../domain/domainUsecases";
import { OTPEntity } from "../../../domain/entities/common";
import { IMovieShow, ITheaterScreen } from "../../../domain/entities/theaters";
import { ITheaterOwnerEntity } from "../../../domain/entities/theaters/ITheaterOwners"
import { IResetPassword, ITheaterDetailResponse, TheaterOwnerProfile, TheaterProfile } from "../../../utils/interface";

interface ITheaterRepositories {
  createTheaterOwner: (data: ITheaterOwnerEntity) => Promise<ITheaterOwnerEntity | null>
  findTheaterOwnerByEmail: (email: string) => Promise<ITheaterOwnerEntity | null>
  findTheaterOwnerOTP: (email: string) => Promise<OTPEntity | null>
  verifyTheaterOwner: (data: IUpdateVerification) => Promise<boolean>
  createTheatersOTP: (email: string, otp: string) => Promise<void>
  findTheaterOwnerById: (_id: string) => Promise<ITheaterOwnerEntity | null>;
  resetPasswordTheaters: (payload: IResetPassword) => Promise<boolean>
  getTheaterDetails: (ownerId: string) => Promise<ITheaterDetailResponse | undefined>;
  updateTheater: (_id: string, payload: TheaterProfile) => Promise<ITheaterOwnerEntity | null>;
  updateTheaterOwner: (_id: string, payload: TheaterOwnerProfile) => Promise<ITheaterOwnerEntity | null>;
  createTheaterScreen: (_id: string, payload: ITheaterScreen) => Promise<ITheaterScreen>;
  getAllTheaterScreen: (_id: string) => Promise<ITheaterScreen[] | []>;
  createMovieShows: (_id: string, payload: Omit<IMovieShow, 'theaterId'>) => Promise<IMovieShow>
}

export {
  ITheaterRepositories
}