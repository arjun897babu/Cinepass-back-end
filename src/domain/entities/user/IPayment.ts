import { Document, ObjectId, Types } from "mongoose";
import { PaymentStatus, PurchasedItem } from "../../../utils/enum";
import { IMovie } from "../admin/ITheaterMovie";
import { IMovieShow, ITheaterOwnerEntity, ITheaterScreen } from "../theaters";
import { IRental } from "../../../utils/interface";

interface IPayment extends Document {
  movieId: ObjectId;
  showId?: ObjectId;
  userId: Types.ObjectId;
  rentalId:ObjectId;
  screenId?: ObjectId;
  purchasedItem: PurchasedItem
  status: PaymentStatus;
  bookingDate: Date;
  seats?: string[];
  totalAmount: number;
  paymentIntentId: string;// for tracking payments in stripe
  serviceCharge?: number;
  extraCharge?: number;
  movie: Pick<IMovie, 'movie_name' | 'movie_poster'|'release_date'>;
  showDetail?: Pick<IMovieShow, 'format' | 'language' | 'showTime'|'endTime'>;
  theater?: Pick<ITheaterOwnerEntity, 'theater_name' | 'city'>;
  screen?: Pick<ITheaterScreen, 'chargePerSeat' | 'screen_name'>
  rentalPlan?:IRental
}

export {
  IPayment
}