import { IUserTicketDataResponse } from "../../../domain/domainUsecases/common";
import { OTPEntity } from "../../../domain/entities/common";
import { IPayment } from "../../../domain/entities/user/IPayment";
import { ITickets } from "../../../domain/entities/user/ITickets";
import { UserEntity } from "../../../domain/entities/user/IUserEntity";
import { PaymentStatus } from "../../../utils/enum";
import { IResetPassword, TicketFilter } from "../../../utils/interface";

interface IRepositories {
  signUp: (data: UserEntity) => Promise<UserEntity | null>;
  findByEmail: (data: string) => Promise<UserEntity | null>;
  login: (email: string) => Promise<UserEntity | null>;
  createOTP: (email: string, OTP: string) => Promise<void>;
  findOtp: (email: string) => Promise<OTPEntity | null>;
  findUserById: (_id: string) => Promise<UserEntity | null>;
  changeUserStatus: (email: string, verified: boolean) => Promise<boolean>;
  resetPassword: (JwtPayload: IResetPassword) => Promise<boolean>;
  getCities: () => Promise<string[] | []>
  getUserProfile: (_id: string) => Promise<UserEntity>
  updateUserProfile: (_id: string, payload: Partial<UserEntity>) => Promise<Partial<UserEntity>>
  createPayment: (data: Partial<IPayment>) => Promise<void>
  updatePaymentStatus: (paymentIntentId: string, newStatus: PaymentStatus) => Promise<void>,
  createTickets: (data: Pick<ITickets, 'userId' | 'showId' | 'bookingDate' | 'bookingStatus' | 'seats' | 'paymentId'>) => Promise<ITickets>;
  getTicketData: (_id: string, pageNumber: number, filter?: TicketFilter) => Promise<IUserTicketDataResponse>

}

export {
  IRepositories
}