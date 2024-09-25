import { config } from '../config/envConfig';
import Stripe from 'stripe'
import { CustomError, handleStripeErrors } from '../utils/CustomError';
import { HttpStatusCode, PurchasedItem } from '../utils/enum';
import { IPaymentMetaData } from '../utils/interface';


const stripe = new Stripe(config.stripe.stripe_secret)

const createPaymentIntent = async (totalAmount: number, metaData: IPaymentMetaData): Promise<{ clientSecret: string, paymentIntentId: string }> => {
  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: { ...metaData }
    });

    if (!paymentIntent || !paymentIntent.client_secret) {
      throw new CustomError('Unable to create paymentIntent', HttpStatusCode.INTERNAL_SERVER_ERROR, 'stripe');
    }
    return { clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id }

  } catch (error) {
    handleStripeErrors(error)

  }
}

const constructWebhook = async (payload: Buffer, signature: string) => {
  try {
    const event = stripe.webhooks.constructEvent(
      payload, signature,
      config.stripe.stripe_webhook_secret
    )
    return event
  } catch (error) {
    throw error
  }
}


export {
  createPaymentIntent,
  constructWebhook
}