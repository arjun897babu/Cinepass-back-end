import { CustomError } from "../../../utils/CustomError"
import { generatePaymentData } from "../../../utils/paymentHelper"
import { IDependencies } from "../../interface/user/IDependencies"
import {
  cancelPaymentIntent,
  createPaymentIntent,
  retrievePaymentIntent
} from "../../../infrastructure/stripe"
import {
  HttpStatusCode,
  PaymentIntentStatus,
  PurchasedItem,
  ResponseStatus
} from "../../../utils/enum"

const purchaseStream = (dependencies: IDependencies) => {
  const { repositories: { getSingleStreamingMovie, createPayment } } = dependencies

  return {
    execute: async (userId: string, movieId: string) => {
      try {

        const response = await getSingleStreamingMovie(movieId)

        if (!response) {
          throw new CustomError('Movie not available', HttpStatusCode.NOT_FOUND, 'movie')
        }

        const { clientSecret, paymentIntentId } = await createPaymentIntent(
          response.streamingPlan.price,
          {
            bookingDate: `${new Date()}`,
            purchasedItem: PurchasedItem.RENTAL,
            userId,
            rentalId: `${response.streamingPlan._id}`,
          }
        );

        setTimeout(async () => {
          const status = await retrievePaymentIntent(paymentIntentId)
          if (status === PaymentIntentStatus.PENDING) {
            await cancelPaymentIntent(paymentIntentId)
          }
        }, (1000 * 60 * 1))

        const paymentData = generatePaymentData(
          PurchasedItem.RENTAL,
          userId,
          new Date(),
          paymentIntentId,
          response.streamingPlan.price,
          undefined, undefined,
          response.streamingPlan,
          response.streamingPlan._id,
          response._id,
          {
            movie_name: response.movie_name,
            movie_poster: response.movie_poster,
            release_date: response.release_date
          }
        )

        await createPayment(paymentData)

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
  purchaseStream
}