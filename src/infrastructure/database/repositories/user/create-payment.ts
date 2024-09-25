import { IPayment } from "../../../../domain/entities/user/IPayment"
import { payments } from "../../model/user/payment-schema"

const createPayment = async (data: Partial<IPayment>) => {
  try {
    await payments.create(data)
  } catch (error) {
    throw error
  }
}

export {
  createPayment
}