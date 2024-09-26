import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies";
 
const cancelUserTicket = (dependencies: IDependencies) => {
  const { useCases: { cancelTickets } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { roles, _id, paymentIntent } = req.params 

      const response = await cancelTickets(dependencies).execute(_id, paymentIntent)

      return {
        status:response.status,
        message:response.message,
      }

    } catch (error) {
      next(error)
    }
  }
}

export {
  cancelUserTicket
}