import { IPaymentResponse } from "../common";

interface IPurchaseStream {
  execute: (userId: string, movieId: string) => Promise<IPaymentResponse>
}

export {
  IPurchaseStream
}