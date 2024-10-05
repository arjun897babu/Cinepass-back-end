import { Document } from "mongoose";

interface IStreamRentalPlan extends Document {
  planName: string;
  price: number;
  validity: Number; //representing the days
  listed: true
}
export {
  IStreamRentalPlan
}