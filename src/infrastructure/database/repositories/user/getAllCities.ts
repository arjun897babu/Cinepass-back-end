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
      {
        $unwind: "$cities"
      },
      {
        $sort: {
          cities: 1
        }
      },
      {
        $group: {
          _id: null,
          cities: {
            $push: "$cities"
          }
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