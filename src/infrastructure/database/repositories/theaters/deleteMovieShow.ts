import { MovieShow } from "../../model/theaters"

const deleteMovieshow = async (showId: string): Promise<boolean> => {
  try {
    const isDeleted = await MovieShow.findOneAndUpdate({ _id: showId }, { listed: false, select: '_id listed' }).lean()
    return isDeleted ? true : false
  } catch (error) {
    throw error
  }
}

export {
  deleteMovieshow
}