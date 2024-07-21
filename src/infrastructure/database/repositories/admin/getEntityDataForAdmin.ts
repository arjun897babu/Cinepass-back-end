import { Model } from "mongoose";
import { ITheaterOwnerEntity } from "../../../../domain/entities/theaters";
import { TheaterOwner } from "../../model/theaters";
import { Users } from "../../model/user/userSchema";
import { Role } from "../../../../utils/enum";
import { UserEntity } from "../../../../domain/entities/user/IUserEntity";

const model: Record<string, Model<any>> = {
  [Role.users]: Users,
  [Role.theaters]: TheaterOwner
}

const getEntityData = async (role: Role.users | Role.theaters): Promise<ITheaterOwnerEntity[] | UserEntity[] | []> => {

  const db = model[role];

  try {

    const data = await db.find({}).lean();

    return data.length ?
      data as (ITheaterOwnerEntity[] | UserEntity[]) : []

  } catch (error) {
    throw error
  }
}

export {
  getEntityData
}