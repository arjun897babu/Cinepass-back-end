import { IUserTicketDataResponse } from "../../../domain/domainUsecases/common";
import { IStreamingMovieResponse } from "../../../domain/domainUsecases/user/IGetStreamingMovies";
import { OTPEntity } from "../../../domain/entities/common";
import { IPayment } from "../../../domain/entities/user/IPayment";
import { ITickets } from "../../../domain/entities/user/ITickets";
import { UserEntity } from "../../../domain/entities/user/IUserEntity";
import { PaymentStatus } from "../../../utils/enum";
import { IResetPassword, IStreamMovieFilter, StreamingMovieResponse, TicketFilter } from "../../../utils/interface";

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
  updateTicketStatus: (paymentIntent: string) => Promise<void>
  getStreamingMovies: (filter: Partial<IStreamMovieFilter>) => Promise<IStreamingMovieResponse | null>
  getSingleStreamingMovie: (movieId: string) => Promise<StreamingMovieResponse | null>

}

export {
  IRepositories
}