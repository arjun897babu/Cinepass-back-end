import { Document, ObjectId } from "mongoose";
import { IMovie } from "../admin/ITheaterMovie";
import { IMovieShow, ITheaterOwnerEntity, ITheaterScreen } from "../theaters";
import { BookingStatus } from "../../../utils/enum";

interface ITickets extends Document {
  userId: ObjectId;
  showId: ObjectId;
  paymentId: ObjectId;
  // movie: Pick<IMovie, 'movie_name' | 'cover_photo'>;
  // showDetail: Pick<IMovieShow, 'format' | 'language' | 'showTime'>;
  // theater: Pick<ITheaterOwnerEntity, 'theater_name'|'city'>;
  // screen: Pick<ITheaterScreen, 'chargePerSeat' | 'screen_name'>;
  bookingStatus: BookingStatus;
  bookingDate: Date;
  seats: string[];
}

export {
  ITickets
}