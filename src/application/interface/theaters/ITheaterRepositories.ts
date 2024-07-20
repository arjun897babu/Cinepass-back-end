import { IUpdateVerification } from "../../../domain/domainUsecases";
import { OTPEntity } from "../../../domain/entities/common";
import { ITheaters } from "../../../domain/entities/theaters";
import { ITheaterOwnerEntity } from "../../../domain/entities/theaters/ITheaterOwners"

interface ITheaterRepositories {
  createTheaterOwner: (data: ITheaterOwnerEntity) => Promise<ITheaterOwnerEntity | null>
  findTheaterOwnerByEmail: (email: string) => Promise<ITheaterOwnerEntity | null>
  findTheaterOwnerOTP: (email: string) => Promise<OTPEntity | null>
  verifyTheaterOwner: (data: IUpdateVerification) => Promise<boolean>
  createTheatersOTP: (email: string, otp: string) => Promise<void>
  createTheater: (data: ITheaters) => Promise<boolean>
}

export {
  ITheaterRepositories
}