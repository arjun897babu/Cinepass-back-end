import Stripe from "stripe";


class CustomError extends Error {
  statusCode: number;
  field: string
  constructor(message: string, statusCode: number, field: string) {
    super(message)
    this.statusCode = statusCode
    this.field = field

  }
}

function handleStripeErrors(error: unknown):never {
  if (error instanceof Stripe.errors.StripeCardError) {
    console.log(`A payment error occurred: ${error.message, error.statusCode}`);
    throw new CustomError(error.message,500,'card')
  } else if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
    console.log(`couldn’t verify that a webhook event:${error.message, error.statusCode} `);
    throw new CustomError(error.message,500,'card')
  } else if (error instanceof Stripe.errors.StripeRateLimitError) {
    console.log(`You made too many API calls in too short a time:${error.message, error.statusCode}`);
    throw new CustomError(error.message,500,'card')
  } else if (error instanceof Stripe.errors.StripeConnectionError) {
    console.log(`There was a network problem between your server and Stripe:${error.message, error.statusCode} `);
    throw new CustomError(error.message,500,'card')
  } else if (error instanceof Stripe.errors.StripeAPIError) {
    console.log(`Something went wrong on Stripe’s end:${error.message, error.statusCode} `);
    throw new CustomError(error.message,500,'card')
  } else if (error instanceof Stripe.errors.StripeInvalidRequestError) {
    console.log(`made an API call with the wrong parameters:${error.message, error.statusCode}`);
    throw new CustomError(error.message,500,'card')
  } else if (error instanceof Stripe.errors.StripePermissionError) {
    console.log(` does not have the necessary permissions.:${error.message, error.statusCode}`);
    throw new CustomError(error.message,500,'card')
  }else{
    throw new CustomError('An unknown error',500,'card')

  }
}

export {
  CustomError,
  handleStripeErrors
}   