import Stripe from "stripe";
import { constructWebhook } from "../../../infrastructure/stripe";
import { PaymentStatus, PurchasedItem, StripeWebhookEventType } from "../../../utils/enum";
import { ICommonDependencies } from "../../interface/common/ICommonDependencies";

import { generateReservedSeats, generateTicketData } from "../../../utils/paymentHelper";


const stripeWebhookEvents = (dependencies: ICommonDependencies) => {

  const { commonUsecases: { } } = dependencies
  const { theaterRepositories: { removeReservedSeats } } = dependencies
  const { userRepositories: { updatePaymentStatus, createTickets, updateTicketStatus } } = dependencies

  return {
    execute: async (payload: Buffer, signature: string) => {
      try {

        const event = await constructWebhook(payload, signature)

        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const { metadata, id } = paymentIntent
        const reservedSeats = generateReservedSeats(metadata.seats) // generating reserved seats using helper function
        const ticketData = generateTicketData(metadata, id)//generating ticket data using helper function

        switch (event.type) {
          case StripeWebhookEventType.PaymentIntentSucceeded:

            if (metadata.purchasedItem === PurchasedItem.TICKET) {
              await createTickets(ticketData)
            }
            await updatePaymentStatus(paymentIntent.id, PaymentStatus.PAID)

            break;

          case StripeWebhookEventType.PaymentIntentFailed:

            await updatePaymentStatus(id, PaymentStatus.FAILED)
            await removeReservedSeats(
              metadata.showId,
              {
                bookingDate: new Date(metadata.bookingDate),
                reservedSeats
              }
            )
            break;
          case StripeWebhookEventType.PaymentIntentCancel:

            await updatePaymentStatus(id, PaymentStatus.FAILED)
            await removeReservedSeats(
              metadata.showId,
              {
                bookingDate: new Date(metadata.bookingDate),
                reservedSeats
              }
            )

            break;

          case StripeWebhookEventType.Refund:
            console.log('amount refunded', metadata)
            if (metadata.purchasedItem === PurchasedItem.TICKET) {
              await updateTicketStatus(id)
              await removeReservedSeats(
                metadata.showId,
                {
                  bookingDate: new Date(metadata.bookingDate),
                  reservedSeats
                }
              )
            }

            break

          default:

            console.log(`Unhandled event type ${event.type}`)
        }


        return {
          received: true
        }


      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
}

export {
  stripeWebhookEvents
}