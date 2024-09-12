import { Model } from "mongoose";
import { MovieType, Role } from "../../../../utils/enum";
import { TheaterMovie } from "../../model/admin/theaterMovieSchema";
import { calculateSkip, getMaxPage } from "../../../../utils/FilterAndPagination";
import { MovieResponse } from "../../../../utils/interface";


//for getting all the available movies for admin side and theater owners side

const model: Record<string, Model<any>> = {
  [MovieType.THEATER]: TheaterMovie
};

const getMovies = async (movieType: MovieType, role: Role, pageNumber: number): Promise<MovieResponse> => {
  try {

    const db = model[movieType];
    const limit = 3;
    const skip = calculateSkip(pageNumber, limit)


    let matchQuery = role === Role.admin ?
      { listed: true }
      : {
        listed: true,
        release_date: { $gt: new Date() }
      }


    const [response] = await db.aggregate([
      {
        $facet: {
          movies: [
            {
              $match: matchQuery
            },
            {
              $sort: { release_date: -1 }
            },
            ...role === Role.admin ?
              [
                { $skip: skip },
                { $limit: limit }
              ]
              : []
          ],
          totalCount: [
            { $count: "total" }
          ]
        }
      },
      {
        $unwind: '$totalCount'
      },
      {
        $project: {
          totalDocument: '$totalCount.total',
          movies: '$movies'
        }
      }
    ]);
console.log('response in get movies repository',response)
    return {
      maxPage:getMaxPage( response.totalDocument,limit),
      movies: response.movies
    }

  } catch (error) {
    console.log('reahing error in getmovie error catch',error)
    throw error
  }  
} 

export {
  getMovies
}