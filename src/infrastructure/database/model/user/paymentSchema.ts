import { model, Schema } from "mongoose";
import { IPayment } from "../../../../domain/entities/user/IPayment";
import { PaymentStatus, PurchasedItem } from "../../../../utils/enum";


const paymentSchema = new Schema<IPayment>({
  movieId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  showId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  screenId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  purchasedItem: {
    type: String,
    enum: Object.values(PurchasedItem),
    required: true,
  },

  status: {
    type: String,
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.PENDING
  },
  BookingDate: {
    type: Date,
    required: true
  },

  seats: [
    {
      type: String,
      required: true
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  paymentIntentId: {
    type: String,
    required: true
  },  // Stripe PaymentIntent ID for tracking payments

  serviceCharge: {
    type: Number,
    default: 20
  },

  extraCharge: {
    type: Number,
    default: 0
  },

  movie: {
    movie_name: {
      type: String,
      required: true
    },
    cover_photo: {
      type: String,
      required: true
    },
  },

  showDetail: {
    format: {
      type: String,
      required: true
    },

    language: {
      type: String,
      required: true
    },

    showTime: {
      type: Date,
      required: true
    },
    
  },


  theater: {
    theater_name: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
  },

  screen: {
    chargePerSeat: {
      type: Number,
      required: true
    },
    screen_name: {
      type: String,
      required: true
    },
  },
},
  {
    timestamps: true,
  }
);



export const payments = model('Payments', paymentSchema);
