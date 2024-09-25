import { PaymentStatus } from "../../../../utils/enum";
import { payments } from "../../model/user/payment-schema";

const updatePaymentStatus = async (paymentIntentId: string, newStatus: PaymentStatus) => {
   try {
    await payments.findOneAndUpdate(
      {  paymentIntentId:paymentIntentId },
      {
        $set: {
          status: newStatus
        }
      }
    )
  } catch (error) {
    throw error
  }
};

export {
  updatePaymentStatus
}