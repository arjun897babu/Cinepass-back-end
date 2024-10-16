import mongoose, { ObjectId, Types } from "mongoose";
import { IPayment } from "../domain/entities/user/IPayment";
import { ICheckShowAvailableResponse, IPaymentMetaData, IRental, TicketDataParams } from "./interface";
import { BookingStatus, PaymentStatus, PurchasedItem } from "./enum";
import Stripe from "stripe";
import { generateRandomId, stringToNumberId } from "./slugify";

function calculateTotalAmount(totalSeat: number, chargePerSeat: number, serviceCharge: number = 20): number {
  console.log(totalSeat, chargePerSeat, serviceCharge)
  return (totalSeat * chargePerSeat) + (totalSeat * serviceCharge);
}

function generatePaymentData(
  purchasedItem: PurchasedItem,
  ownerId: string,
  bookingDate: Date,
  paymentIntentId: string,
  totalAmount: number,
  seats?: string[],
  showDetail?: ICheckShowAvailableResponse,
  rentalPlan?: IRental,
  rentalId?: ObjectId,
  movieId?: ObjectId,
  movieDetails?: IPayment['movie']
) {
  const paymentData: Partial<IPayment> = {
    userId: new mongoose.Types.ObjectId(ownerId),
    purchasedItem: purchasedItem,
    status: PaymentStatus.PENDING,
    bookingDate,
    totalAmount,
    paymentIntentId,
    movieId: showDetail?.showDetails.movieId ?? movieId
  }
  if (purchasedItem === PurchasedItem.TICKET) {
    if (seats && showDetail) {
      const { movieDetails, screenDetails, showDetails, theaterDetails } = showDetail

      paymentData.movie = {
        movie_name: movieDetails.movie_name,
        movie_poster: movieDetails.movie_poster,
        release_date: movieDetails.release_date

      },
        paymentData.theater = {
          theater_name: theaterDetails.theater_name,
          city: theaterDetails.city
        },
        paymentData.screen = {
          chargePerSeat: screenDetails[0].chargePerSeat,
          screen_name: screenDetails[0].screen_name
        },
        paymentData.showDetail = {
          format: showDetails.format,
          language: showDetails.language,
          showTime: showDetails.showTime,
          endTime: showDetails.endTime,
          cancelationDeadline: showDetails.cancelationDeadline
        }
      paymentData.showId = showDetails.showId
      paymentData.seats = seats
      paymentData.screenId = showDetails.screenId
    }
  }
  else if (purchasedItem === PurchasedItem.RENTAL) {
    if (rentalId && rentalPlan && movieDetails) {
      paymentData.rentalId = rentalId
      paymentData.rentalPlan = rentalPlan
      paymentData.movie = {
        movie_name: movieDetails.movie_name,
        movie_poster: movieDetails.movie_poster,
        release_date: movieDetails.release_date
      }
      paymentData.serviceCharge = 0
    }
  }

  return paymentData
}

function generateReservedSeats(reservedSeats: string): string[] {
  return reservedSeats.includes(',')
    ? reservedSeats.split(',')
    : [reservedSeats]
}

function generateTicketData(metaData: Stripe.Metadata, paymentIntentId: string): TicketDataParams {

  return {
    userId: metaData.userId,
    theaterId: metaData.theaterId,
    showId: metaData.showId,
    screenId: metaData.screenId,
    seats: generateReservedSeats(metaData.seats!),
    bookingDate: new Date(metaData.bookingDate),
    paymentId: paymentIntentId,
    bookingStatus: BookingStatus.BOOKED
  }
}

function generateTicketCode(bookingDate: Date, userId: string): string {

  const formattedDate = bookingDate.toISOString().split('T')[0].split('-').reverse().join('');

  return `${formattedDate}/${stringToNumberId(userId).substring(-1, 4)}${generateRandomId()}`;
}


export {
  generateTicketCode,
  generateTicketData,
  generateReservedSeats,
  calculateTotalAmount,
  generatePaymentData
}