import { Types } from "mongoose";
import { Role } from "../../../../utils/enum";
import { GetShowsParams } from "../../../../utils/interface";
import { MovieShow } from "../../model/theaters";

const getRunningMovies = async ({ role, _id, city, filter }: GetShowsParams) => {

  try {
    console.log(`get running movie repository for ${role} with ${city}`, filter);
    const matchQuery = role === Role.theaters
      ? { 'theaterId': new Types.ObjectId(_id), 'theater.status': true }
      : {
        'theater.status': true,
        listed:true,
        'theater.city': {
          $regex: city,
          $options: 'i'
        },
        openingDate: (filter?.nowShowing) ?
          { $lte: new Date() }
          : { $gt: new Date() }
      };
 

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
        $match: matchQuery
      },
      {
        $group: {
          _id: null,
          movies: { $addToSet: '$movie' },
          allLanguages: { $addToSet: '$movie.languages' },
          allFormats: { $addToSet: '$movie.format' },
          allGenres: { $addToSet: '$movie.genres' }
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
          },
          languages: {
            $reduce: {
              input: '$allLanguages',
              initialValue: [],
              in: {
                $concatArrays: ['$$value', '$$this'],
              },
            },
          },
          formats: {
            $reduce: {
              input: '$allFormats',
              initialValue: [],
              in: {
                $concatArrays: ['$$value', '$$this'],
              },
            },
          },
          genres: {
            $reduce: {
              input: '$allGenres',
              initialValue: [],
              in: {
                $concatArrays: ['$$value', '$$this'],
              },
            },
          },
        }
      },
      {
        $project: {
          movies: 1,
          languages: { $setUnion: ['$languages'] },
          formats: { $setUnion: ['$formats'] },
          genres: { $setUnion: ['$genres'] },
        },
      },
    ]);

    // console.log('get running movies repository', movies)

    return movies ? movies.movies : []
  } catch (error) {
    throw error
  }
}
export {
  getRunningMovies
}