import { model, Schema } from "mongoose";
import { AdminEntity } from "../../../../domain/entities/admin/IAdmin";


const adminSchema = new Schema<AdminEntity>({

  email: {
    type: String,
    require: true,
    unique: false
  },
  password: {
    type: String,
    require: true,
  }

})

export const Admin = model<AdminEntity>('Admin', adminSchema)