import { IMovieShow } from "../../../../domain/entities/theaters"
import { MovieShow } from "../../model/theaters"

const updateMovieShow = async (showId: string, payload: IMovieShow): Promise<boolean> => {
  try {

    const updated = await MovieShow.findOneAndUpdate({ _id: showId }, { ...payload }, { new: true }).lean()

    return updated ? true : false

  } catch (error) {
    throw error
  }
}

export {
  updateMovieShow
}