import { Types } from "mongoose";
import { Role } from "../../../../utils/enum";
import { GetShowsParams } from "../../../../utils/interface";
import { MovieShow } from "../../model/theaters";

const getRunningMovies = async ({ role, _id, city }: GetShowsParams) => {

  try {
   
    const matchQuery = role === Role.theaters
      ? { 'theaterId': new Types.ObjectId(_id), 'theater.status': true }
      : { 'theater.status': true, 'theater.city': { $regex: city, $options: 'i' } };

    const [movies] = await MovieShow.aggregate([
      {
        $lookup: {
          from: 'theaterowners',
          localField: 'theaterId',
          foreignField: '_id',
          as: 'theater'
        }
      },
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
        $unwind: '$movie'
      },
      {
        $group: {
          _id: null,
          movies: { $addToSet: '$movie' }
        }
      },
      {
        $project: {
          _id: 0,
          movies: {
            $sortArray: {
              input: '$movies',
              sortBy: { 'release_date': 1 }
            }
          }
        }
      }
    ]);

    return movies ? movies.movies : []
  } catch (error) {
    throw error
  }
}
export {
  getRunningMovies
}