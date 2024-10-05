import { model, Schema } from "mongoose";
import { IStreamRentalPlan } from "../../../../domain/entities/admin/IStreamRentalPlan";

const streamRentalPlanSchema = new Schema<IStreamRentalPlan>({
  planName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  validity: {
    type: Number,
    default: 30,
    required: true
  },
  listed: {
    type: Boolean,
    default: true
  },
},
  { timestamps: true }
)

export const StreamPlans = model('StreamPlans', streamRentalPlanSchema) 