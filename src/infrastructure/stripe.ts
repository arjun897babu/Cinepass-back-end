import { config } from '../config/envConfig';
import Stripe from 'stripe'
import { CustomError } from '../utils/CustomError';
import { HttpStatusCode } from '../utils/enum';
const stripe = new Stripe(config.stripe.stripe_secret)
const createPaymentIntent = async (totalAmount: number): Promise<string> => {

  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    if (!paymentIntent || !paymentIntent.client_secret) {
      throw new CustomError('Unable to create paymentIntent', HttpStatusCode.INTERNAL_SERVER_ERROR, 'stripe');
    }

    return paymentIntent.client_secret

  } catch (error) {
    throw error
  }

}

export {
  createPaymentIntent
}