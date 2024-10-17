import Stripe from "stripe";
import { constructWebhook } from "../../../infrastructure/stripe";
import { ICommonDependencies } from "../../interface/common/ICommonDependencies";
import { TicketDataParams } from "../../../utils/interface";
import {
  PaymentStatus,
  PurchasedItem,
  StripeWebhookEventType
} from "../../../utils/enum";
import {
  generateReservedSeats,
  generateTicketData
} from "../../../utils/paymentHelper";


const stripeWebhookEvents = (dependencies: ICommonDependencies) => {

  const {
    theaterRepositories: { removeReservedSeats },
    userRepositories: { updatePaymentStatus, createTickets, updateTicketStatus } } = dependencies;


  return {
    execute: async (payload: Buffer, signature: string|string[]) => {
      try {

        const event = await constructWebhook(payload, signature)

        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const { metadata, id } = paymentIntent

        const bookingDate = new Date(metadata.bookingDate)
        const purchasedItem = metadata.purchasedItem
        let reservedSeats: string[] | undefined
        let ticketData: TicketDataParams | undefined

        if (purchasedItem === PurchasedItem.TICKET) {
          reservedSeats = generateReservedSeats(metadata.seats) // generating reserved seats using helper function
          ticketData = generateTicketData(metadata, id)//generating ticket data using helper function
        }

        switch (event.type) {
          case StripeWebhookEventType.PaymentIntentSucceeded:

            if (purchasedItem === PurchasedItem.TICKET && ticketData) {
              await createTickets(ticketData)
            }

            await updatePaymentStatus(paymentIntent.id, PaymentStatus.PAID)

            break;

          case StripeWebhookEventType.PaymentIntentFailed:
          case StripeWebhookEventType.PaymentIntentCancel:

            await updatePaymentStatus(id, PaymentStatus.FAILED)
            if (purchasedItem === PurchasedItem.TICKET && reservedSeats) {
              await removeReservedSeats(
                metadata.showId,
                {
                  bookingDate,
                  reservedSeats
                }
              )
            }

            break;

          case StripeWebhookEventType.Refund:

            if (purchasedItem === PurchasedItem.TICKET && reservedSeats) {
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