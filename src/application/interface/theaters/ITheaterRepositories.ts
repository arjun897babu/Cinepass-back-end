import { IUpdateVerification } from "../../../domain/domainUsecases";
import { OTPEntity } from "../../../domain/entities/common";
import { IMovieShow, ITheaters, ITheaterScreen } from "../../../domain/entities/theaters";
import { ITheaterOwnerEntity } from "../../../domain/entities/theaters/ITheaterOwners"
import { IResetPassword, ITheaterDetailResponse, ITheaterUpdateInfoPayload } from "../../../utils/interface";

interface ITheaterRepositories {
  createTheaterOwner: (data: ITheaterOwnerEntity) => Promise<ITheaterOwnerEntity | null>
  findTheaterOwnerByEmail: (email: string) => Promise<ITheaterOwnerEntity | null>
  findTheaterOwnerOTP: (email: string) => Promise<OTPEntity | null>
  verifyTheaterOwner: (data: IUpdateVerification) => Promise<boolean>
  createTheatersOTP: (email: string, otp: string) => Promise<void>
  createTheater: (data: ITheaters) => Promise<boolean>;
  findTheaterOwnerById: (_id: string) => Promise<ITheaterOwnerEntity | null>;
  resetPasswordTheaters: (payload: IResetPassword) => Promise<boolean>
  getTheaterDetails: (ownerId: string) => Promise<ITheaterDetailResponse | undefined>;
  updateTheater: (_id: string, payload: ITheaterUpdateInfoPayload) => Promise<ITheaters | null>;
  createTheaterScreen: (_id: string, payload: ITheaterScreen) => Promise<ITheaterScreen>;
  getAllTheaterScreen: (_id: string) => Promise<ITheaterScreen[] | []>;
  createMovieShows: (_id: string, payload: Omit<IMovieShow, 'theaterId'>) => Promise<IMovieShow>
}

export {
  ITheaterRepositories
}