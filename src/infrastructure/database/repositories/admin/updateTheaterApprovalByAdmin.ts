import { IUpdateApproval } from "../../../../domain/domainUsecases"
import { TheaterOwner } from "../../model/theaters"

const updateTheaterApprovalByAdmin = async (payload: IUpdateApproval): Promise<IUpdateApproval | null> => {
  try {

    const updated = await TheaterOwner.findOneAndUpdate({ _id: payload.theaterOwnerId }, { approval_status: payload.approval_status }, { new: true })

    if (!updated) {
      return null
    }
    return {
      theaterOwnerId: updated._id.toString(),
      approval_status: updated.approval_status as string
    }
  } catch (error) {
    throw error
  }
}

export {
  updateTheaterApprovalByAdmin
}