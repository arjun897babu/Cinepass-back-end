import { IPayment } from "../../../../domain/entities/user/IPayment"
import { payments } from "../../model/user/payment-schema"

const createPayment = async (data: Partial<IPayment>) => {
  try {
    await payments.create(data)
  } catch (error) {
    console.log('error while saving the payment: ',error)
    throw error
  }
}

export {
  createPayment
}