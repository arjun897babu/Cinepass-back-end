import { NextFunction, Request, Response } from "express"
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies"
 
const stripeWebhooks = (dependencies: ICommonDependencies) => {

  const { commonUsecases: { stripeWebhookEvents } } = dependencies
  
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signature = req.headers['stripe-signature']
      const payload = req.body 
      const response = await stripeWebhookEvents(dependencies).execute(payload, signature as string )
      res.json(response);
    } catch (error) {
      next(error)
    }

  }
}

export {
  stripeWebhooks
}