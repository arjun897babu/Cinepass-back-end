import { Types } from "mongoose";
import { GetShowsParams, IGetMovieShowResponse } from "../../../../utils/interface";
import { MovieShow } from "../../model/theaters";
import { calculateSkip } from "../../../../utils/FilterAndPagination";

//get shows repository for theater owners to fetch all shows specific to that theater owner
const getShows = async ({ role, _id, city }: GetShowsParams): Promise<IGetMovieShowResponse[] | []> => {
  try {
    const limit = 3
    // const skip = calculateSkip(pageNumber, limit)
    console.log(`get shows repository for ${role} based on ${_id} and ${city}`);

    const shows = await MovieShow.aggregate([
      {
        $lookup: {
          from: 'theaterowners',
          localField: 'theaterId',
          foreignField: '_id',
          as: 'theater'
        }
      }
      ,
      {
        $match: {
          'theaterId': new Types.ObjectId(_id),
          'theater.status': true,
          listed: true
        }
      },
      {
        $lookup: {
          from: 'theatermovies',
          localField: 'movieId',
          foreignField: '_id',
          as: 'movie'
        }
      },
      {
        $lookup: {
          from: 'theaterscreens',
          localField: 'screenId',
          foreignField: '_id',
          as: 'screen'
        }
      },
      {
        $unwind: '$screen'
      },
      {
        $unwind: '$movie'
      },
      {
        $unwind: '$theater'
      },
      {
        $project: {
          'screen.screen_name': 1,
          'screen._id': 1,
          'screen.amenity': 1,
          'screen.chargePerSeat': 1,
          movie: 1,
          format: 1,
          language: 1,
          showTime: 1,
          endTime: 1,
          openingDate: 1,
          'theater.theater_name': 1,
          'theater.address': 1,
          'theater.city': 1,
          'theater._id': 1,
        }
      }
    ])

    return shows
  } catch (error) {
    throw error
  }
}

export {
  getShows
}