import { model, Schema, Types } from "mongoose";
import { IMovieShow } from "../../../../domain/entities/theaters";
import { timeStamp } from "console";
import { generateRandomId } from "../../../../utils/slugify";

const movieShowSchema = new Schema<IMovieShow>({
  theaterId: {
    type: Types.ObjectId,
    required: true,
    ref: 'TheaterOwner'
  },
  movieId: {
    type: Types.ObjectId,
    required: true,
    ref: 'TheaterMovie'
  },
  screenId: {
    type: Types.ObjectId,
    required: true,
    ref: 'TheaterScreen'
  },
  format: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  showTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  openingDate: {
    type: Date
  },
  listed: {
    type: Boolean,
    default: true
  },
  reserved: [
    {
      booking_date: {
        type: Date,
        required: true
      },
      reserved_seats: [
        {
          type: String,
          required: true
        }
      ]
    }
  ],
  allowCancelation: {
    type: Boolean,
    default: false
  },
  cancelationDeadline: {
    type: Number,
    default: null
  },
  advanceBookingPeriod: {
    type: Number,
    default: 3
  },
  slug: {
    type: String
  }
}, {
  timestamps: true
});

movieShowSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = `show-${generateRandomId()}-${this.language}-${this.format}`;
  }
  next();
});

export const MovieShow = model<IMovieShow>('MovieShow', movieShowSchema);
