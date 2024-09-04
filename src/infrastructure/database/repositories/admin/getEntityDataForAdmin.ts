import { Model } from "mongoose";
import { ITheaterOwnerEntity } from "../../../../domain/entities/theaters";
import { TheaterOwner } from "../../model/theaters";
import { Users } from "../../model/user/userSchema";
import { Role } from "../../../../utils/enum";
import { UserEntity } from "../../../../domain/entities/user/IUserEntity";
import { EntityResponse } from "../../../../domain/domainUsecases/admin/IGetEntityDataForAdmin";
import { getMaxPage } from "../../../../utils/FilterAndPagination";

const model: Record<string, Model<any>> = {
  [Role.users]: Users,
  [Role.theaters]: TheaterOwner
}

const getEntityData = async (role: (Role.users | Role.theaters), pageNumber: number): Promise<EntityResponse> => {

  const db = model[role];
  const limit =3
  const skip = (pageNumber - 1) * limit

  try {


    const [data] = await db.aggregate([
      {
        $match: {}
      },
      {
        $facet: {
          documentCount: [
            { $count: 'total' }
          ],
          data: [
            { $skip: skip },
            { $limit: limit }
          ]
        }
      },
      {
        $unwind: '$documentCount'
      },
      {
        $project: {
          totalDocument: '$documentCount.total',
          data: '$data'
        }
      },

    ]) 

    return {
      maxPage: getMaxPage(data.totalDocument, limit),
      data:data.data
    }

  } catch (error) {
    throw error
  }
}

export {
  getEntityData
}