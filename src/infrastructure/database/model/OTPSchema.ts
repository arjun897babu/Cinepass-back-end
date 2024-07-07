import { model, Schema } from 'mongoose';
import { OTPEntity } from '../../../domain/entities/common';


const OTPSchema = new Schema<OTPEntity>({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 2
  }
});

export const OTP = model<OTPEntity>('OTP', OTPSchema);
