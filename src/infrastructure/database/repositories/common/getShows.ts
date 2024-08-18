import { Types } from "mongoose";
import { Role } from "../../../../utils/enum";
import { GetShowsParams, IGetMovieShowResponse } from "../../../../utils/interface";
import { MovieShow } from "../../model/theaters";

const getShows = async ({ role, _id, city }: GetShowsParams): Promise<IGetMovieShowResponse[] | []> => {
 
  try {
console.log(role, _id, city )
    const matchQuery = role === Role.theaters
      ? { 'theaterId': new Types.ObjectId(_id), 'theater.status': true }
      : { 'theater.city': { $regex: city, $options: 'i' } };

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
        $match: matchQuery
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
          'theater.theater_name': 1,
          'theater.address': 1,
          'theater.city': 1, 
          'theater._id': 1,
        }
      }
    ])

    console.log(shows)

    return shows
  } catch (error) {
    throw error
  }
}

export {
  getShows
}