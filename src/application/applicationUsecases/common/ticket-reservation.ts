import mongoose, { ObjectId, Types } from "mongoose"
import { IReservedSeats } from "../../../domain/entities/theaters"
import { IPayment } from "../../../domain/entities/user/IPayment"
import { cancelPaymentIntent, createPaymentIntent, retrievePaymentIntent } from "../../../infrastructure/stripe"
import { CustomError } from "../../../utils/CustomError"
import { HttpStatusCode, PaymentIntentStatus, PaymentStatus, PurchasedItem, ResponseStatus, Role } from "../../../utils/enum"
import { calculateTotalAmount, generatePaymentData } from "../../../utils/paymentHelper"
import { ICommonDependencies } from "../../interface/common/ICommonDependencies"

const ticketReservation = (dependencies: ICommonDependencies) => {

  const { commonRepositories: { checkShowAvailable } } = dependencies
  const { userRepositories: { createPayment } } = dependencies
  const { theaterRepositories: { addReservedSeats } } = dependencies
  return {
    execute: async (role: Role, _id: string, showId: string, payload: IReservedSeats) => {
      try {
        const isShowAvailable = await checkShowAvailable(showId, payload)

        if (
          !isShowAvailable
          || !isShowAvailable.screenDetails
          || isShowAvailable.screenDetails?.length !== payload.reservedSeats.length
        ) {
          throw new CustomError('seats not available', HttpStatusCode.BAD_REQUEST, 'seats')
        }

        const totalAmount = calculateTotalAmount(
          payload.reservedSeats.length,
          isShowAvailable.screenDetails[0].chargePerSeat
        ) //calculating payment amount

        // console.log('in ticket reservation use case: ', isShowAvailable.theaterDetails)

        const { clientSecret, paymentIntentId } = await createPaymentIntent(
          totalAmount,
          {
            userId: _id,
            theaterId: `${isShowAvailable.theaterDetails._id}`,
            showId: `${isShowAvailable.showDetails.showId}`,
            bookingDate: `${payload.bookingDate}`,
            purchasedItem: PurchasedItem.TICKET,
            seats: payload.reservedSeats.join(',')
          }
        );//creating payment

        setTimeout(async () => {
          console.log(paymentIntentId)
          const status = await retrievePaymentIntent(paymentIntentId)
          if (status === PaymentIntentStatus.PENDING) {
            await cancelPaymentIntent(paymentIntentId)
          }
        }, (1000 * 60 * 1) / 2) 

        const paymentData = generatePaymentData(
          PurchasedItem.TICKET,
          _id,
          payload.bookingDate,
          paymentIntentId,
          totalAmount,
          payload.reservedSeats,
          isShowAvailable
        )

        await createPayment(paymentData)
        await addReservedSeats(showId, payload)



        return {
          status: ResponseStatus.SUCCESS,
          message: 'Payment initiated',
          data: {
            clientSecret: clientSecret,
            paymentIntentId
          }
        }


      } catch (error) {
        throw error
      }
    }
  }


}


export {
  ticketReservation
}