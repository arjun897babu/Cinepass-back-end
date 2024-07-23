import { IUpdateApproval } from "../../../../domain/domainUsecases"
import { ITheaterOwnerEntity } from "../../../../domain/entities/theaters"
import { TheaterOwner } from "../../model/theaters"

const updateTheaterApprovalByAdmin = async (payload: IUpdateApproval): Promise<ITheaterOwnerEntity | null> => {
  try {

    const updated = await TheaterOwner.findOneAndUpdate({ _id: payload.theaterOwnerId }, { approval_status: payload.approval_status }, { new: true })

    if (!updated) {
      return null
    }

    return updated
  } catch (error) {
    throw error
  }
}

export {
  updateTheaterApprovalByAdmin
}