import mongoose, { model, Schema, Document } from "mongoose";
import { ISeat, ITheaterScreen } from "../../../../domain/entities/theaters";



const theaterScreenSchema = new Schema<ITheaterScreen>({
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  screen_name: {
    type: String,
    required: true,
    trim: true,
  },
  seating_capacity: {
    type: Number,
    required: true,
  },
  rows: {
    type: Number,
    required: true
  },
  column: {
    type: Number,
    required: true
  },
  chargePerSeat: {
    type: Number,
    required: true
  },
  amenity: {
    type: String,
    required: true
  },
  layout: {
    type: [
      [
        {
          name: {
            type: String,
            required: true
          },
          booked: {
            type: Boolean,
            default: false
          }
        }
      ]
    ],
    required: true
  }
});


// function transformLayout(layout: string[][]): ISeat[][] {
//   return layout.map(row =>
//     row.map(seatName => ({
//       name: seatName,
//       booked: false
//     }))
//   );
// }

// Export the TheaterScreen model
export const TheaterScreen = model<ITheaterScreen>('TheaterScreen', theaterScreenSchema);
