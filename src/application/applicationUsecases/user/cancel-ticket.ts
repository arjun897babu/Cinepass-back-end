import { createRefund } from "../../../infrastructure/stripe";
import { ResponseStatus } from "../../../utils/enum";
import { IDependencies } from "../../interface/user/IDependencies";

const cancelTickets = (dependencies: IDependencies) => {
  const { repositories: { } } = dependencies;

  return {
    execute: async (_id: string, paymentIntent: string) => {
      try {

        await createRefund(paymentIntent)

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Refund Initiated'
        }

      } catch (error) {
        throw error
      }
    }
  }
}

export {
  cancelTickets
}