import { IUpdateVerification } from "../../../../domain/domainUsecases"
import { ITheaterOwnerEntity, ITheaters } from "../../../../domain/entities/theaters"
import { TheaterOwner } from "../../model/theaters"

const verifyTheaterOwner = async (data: IUpdateVerification): Promise<boolean> => {
  try {
    const updated: ITheaterOwnerEntity | null = await TheaterOwner.findOneAndUpdate(
      { email: data.email },
      { verified: !data.verified },
      { new: true })
      .lean()

    return !!updated
  } catch (error) {
    throw error
  }
}

export {
  verifyTheaterOwner
}