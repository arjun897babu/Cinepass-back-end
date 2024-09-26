import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { HttpStatusCode } from "../../../utils/enum";

const cancelUserPayments = (dependencies: IDependencies) => {
  const { useCases: { cancelPayments } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id, roles, paymentIntent } = req.params
      const response = await cancelPayments(dependencies).execute(_id, paymentIntent)

      return res.status(HttpStatusCode.OK).json({
        status: response.status,
        message: response.message,
      })

    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

export {
  cancelUserPayments
}