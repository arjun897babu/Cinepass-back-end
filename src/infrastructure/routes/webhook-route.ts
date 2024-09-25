import  { Router } from "express";

import { ICommonDependencies } from "../../application/interface/common/ICommonDependencies";
import { commonController } from "../../presentation/controller/common";


const webhookRoutes = (dependencies: ICommonDependencies) => {
  console.log('call in webhook routes');
  const router = Router()
  const {
    stripeWebhooks
  } = commonController(dependencies)

  router
    .route('/stripe')
    .post( stripeWebhooks);


  return router
}


export {
  webhookRoutes
}