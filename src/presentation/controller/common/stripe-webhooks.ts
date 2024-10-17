import { NextFunction, Request, Response } from "express"
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies"
import { CustomError } from "../../../utils/CustomError"
import { HttpStatusCode } from "../../../utils/enum"

const stripeWebhooks = (dependencies: ICommonDependencies) => {

  const { commonUsecases: { stripeWebhookEvents } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signature = req.headers['stripe-signature']

      if (!signature) {
        throw new CustomError('Invalid signature', HttpStatusCode.BAD_REQUEST, 'stripe')
      }
      const payload = req.body
      const response = await stripeWebhookEvents(dependencies).execute(payload, signature)
      res.json(response);
    } catch (error) {
      next(error)
    }

  }
}

export {
  stripeWebhooks
}