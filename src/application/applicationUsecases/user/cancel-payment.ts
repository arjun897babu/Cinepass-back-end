import { cancelPaymentIntent } from "../../../infrastructure/stripe";
import { HttpStatusCode, ResponseStatus } from "../../../utils/enum";
import { IDependencies } from "../../interface/user/IDependencies";

const cancelPayments = (dependencies: IDependencies) => {
  const { repositories: { } } = dependencies
  return {
    execute: async (_id: string, paymentIntent: string) => {
      try {

        await cancelPaymentIntent(paymentIntent)

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Payment canceled'
        }

      } catch (error) {
        throw error
      }
    }
  }
}

export {
  cancelPayments
}