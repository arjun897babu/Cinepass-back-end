import { model, Schema } from "mongoose";
import { IPayment } from "../../../../domain/entities/user/IPayment";
import { PaymentStatus, PurchasedItem } from "../../../../utils/enum";


const paymentSchema = new Schema<IPayment>({
  movieId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  rentalId: {
    type: Schema.Types.ObjectId,
    default: null
  },
  showId: {
    type: Schema.Types.ObjectId,
    default: null
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  screenId: {
    type: Schema.Types.ObjectId,
    default: null
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
  bookingDate: {
    type: Date,
    required: true
  },

  seats: [
    {
      type: String,
      default: null
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
    movie_poster: {
      type: String,
      required: true
    },
    release_date: {
      type: Date,
      required: true
    }
  },

  showDetail: {

    format: {
      type: String,
      default: null

    },

    language: {
      type: String,
      default: null

    },

    showTime: {
      type: String,
      default: null
    },
    endTime:{
      type:String,
      default:null
    }
  },

  theater: {
    theater_name: {
      type: String,
      default: null
    },
    city: {
      type: String,
      default: null

    },
  },

  screen: {
    chargePerSeat: {
      type: Number,
      default: null

    },
    screen_name: {
      type: String,
      default: null

    },
  },
  rentalPlan: {
    planName: {
      type: String,
      default: null
    },
    validity: {
      type: Number,
      default: null
    },
    price: {
      type: Number,
      default: null
    },
    listed: {
      type: Boolean,
      default: null
    }

  }
},
  {
    timestamps: true,
  }
);



export const payments = model('Payments', paymentSchema);
