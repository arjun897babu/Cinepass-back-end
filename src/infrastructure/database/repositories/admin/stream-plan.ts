import { IGetStreamPlanResponse } from "../../../../domain/domainUsecases/admin"
import { IStreamRentalPlan } from "../../../../domain/entities/admin/IStreamRentalPlan"
import { calculateSkip, getMaxPage } from "../../../../utils/FilterAndPagination"
import { IRental, IStreamPlanFilter } from "../../../../utils/interface"
import { StreamPlans } from "../../model/admin/stream-rental-plan"

const addStreamPlan = async (data: Omit<IRental, 'listed'>): Promise<IStreamRentalPlan> => {
  try {
    const newPlan = await StreamPlans.create(data)
    return newPlan
  } catch (error) {
    throw error
  }
}

const editStreamPlan = async (planId: string, data: Omit<IRental, 'listed'>): Promise<IStreamRentalPlan | null> => {
  try {
    const newPlan = await StreamPlans
      .findByIdAndUpdate(
        { _id: planId },
        { $set: data },
        { new: true })
      .select('-_id ')
      .lean()
    return newPlan ?
      newPlan
      : null
  } catch (error) {
    throw error
  }
}

const getStreamPlan = async (filter: Partial<IStreamPlanFilter>): Promise<IGetStreamPlanResponse | null> => {
  const limit = 3
  const skip = calculateSkip(filter.pageNumber || 1, limit)

  try {
    const [plans = null] = await StreamPlans.aggregate([
      { $match: { listed: filter.listed === undefined ? true : filter.listed } },
      {
        $facet: {
          totalDocument: [
            { $count: 'total' }
          ],
          data: [
            ...(filter.all ? [] : [{ $skip: skip }, { $limit: limit }]),
            { $sort: { createdAt: -1 } },
            {
              $project: {
                createdAt: 0,
                updatedAt: 0
              }
            }
          ]
        }
      },
      {
        $unwind: '$totalDocument'
      },
      {
        $project: {
          totalDocument: '$totalDocument.total',
          data: '$data'
        }
      },

    ])

    return plans ?
      {
        maxPage: getMaxPage(plans.totalDocument, limit),
        data: plans.data
      }
      : null

  } catch (error) {
    throw error
  }
}

const deleteStreamPlan = async (planId: string): Promise<IStreamRentalPlan | null> => {
  try {
    const updated = await StreamPlans.findByIdAndUpdate(
      { _id: planId },
      { listed: false }
    ).select('-_id ')
      .lean()
    return updated ? updated : null

  } catch (error) {
    throw error
  }
}

const isPlanExists = async (planName: string): Promise<boolean> => {
  try {
    const exists = await StreamPlans.exists({ planName: { $regex: planName, $options: 'i' } }).lean()
    return exists == null
      ? false
      : true
  } catch (error) {
    throw error
  }
}

export {
  addStreamPlan,
  editStreamPlan,
  deleteStreamPlan,
  getStreamPlan,
  isPlanExists
}