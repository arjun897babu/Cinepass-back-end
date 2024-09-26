import { IResponse2 } from "..";

interface ICancelPayment {
  execute: (_id: string, paymentIntent: string) => Promise<IResponse2>
}

export {
  ICancelPayment
}