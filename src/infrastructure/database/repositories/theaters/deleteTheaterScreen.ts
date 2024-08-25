import { TheaterScreen } from "../../model/theaters"

const deleteTheaterScreen = async (screenId: string): Promise<boolean> => {
  try {
    const isDeleted = await TheaterScreen.findOneAndUpdate({ _id: screenId }, { listed: false }, { new: true, select: '_id listed' }).lean()
    console.log('deleteTheaterscreen repository', isDeleted)
    return isDeleted ? true : false
  } catch (error) {
    throw error
  }
}

export {
  deleteTheaterScreen
}

