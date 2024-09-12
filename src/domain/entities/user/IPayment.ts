import { Document, ObjectId } from "mongoose";
import { PaymentStatus, PurchasedItem } from "../../../utils/enum";
import { IMovie } from "../admin/ITheaterMovie";
import { IMovieShow, ITheaterOwnerEntity, ITheaterScreen } from "../theaters";

interface IPayment extends Document {
  movieId: ObjectId;
  showId: ObjectId;
  userId: ObjectId;
  screenId: ObjectId;
  purchasedItem: PurchasedItem
  status: PaymentStatus;
  BookingDate: Date;
  seats: string[];
  totalAmount: number;
  paymentIntentId: string;// for tracking payments in stripe
  serviceCharge: number;
  extraCharge: number;
  movie: Pick<IMovie, 'movie_name' | 'cover_photo'>;
  showDetail: Pick<IMovieShow, 'format' | 'language' | 'showTime'>;
  theater: Pick<ITheaterOwnerEntity, 'theater_name' | 'city'>;
  screen: Pick<ITheaterScreen, 'chargePerSeat' | 'screen_name'>
}

export {
  IPayment
}