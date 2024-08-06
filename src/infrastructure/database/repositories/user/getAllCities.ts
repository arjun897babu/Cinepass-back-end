import { promises } from "readline"
import { TheaterOwner } from "../../model/theaters"

const getCities = async (): Promise<string[] | []> => {
  try {
    const [{ cities }] = await TheaterOwner.aggregate([
      {
        $group: {
          _id: null,
          cities: { $addToSet: '$city' }
        }

      },
      { $project: { _id: 0, cities: 1 } }
    ]);
    
    return cities
  } catch (error) {
    throw error
  }
}
export {
  getCities
}