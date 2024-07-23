import { Document, Model } from "mongoose";
import { IManageEntity } from "../../../../domain/domainUsecases"
import { TheaterOwner } from "../../model/theaters";
import { Users } from "../../model/user/userSchema";
import { Role } from "../../../../utils/enum";

const model: Record<string, Model<any>> = {
  [Role.users]: Users,
  [Role.theaters]: TheaterOwner
};

const updateBlockStatus = async (payload: IManageEntity): Promise<IManageEntity | null> => {
  try {

    const db = model[payload.role]
   
    const updated = await db.findOneAndUpdate(
      { _id: payload._id },
      [{ $set: { status: { $not: "$status" } } }],
      { new: true }
    );

    return updated ?
      {
        _id: updated._id.toString(),
        role: payload.role
      } : null;


  } catch (error) {
    throw error
  }
};

export {
  updateBlockStatus
}