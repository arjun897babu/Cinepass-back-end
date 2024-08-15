import { MovieShow } from "../../model/theaters"

const getSingleRunningMovie = async (movieId: string, city: string) => {
  try {

    console.log(movieId)
    const movies = await MovieShow.aggregate([
      {
        $facet: {
          movieDetails: [
            {
              $lookup: {
                from: 'theaterowners',
                localField: 'theaterId',
                foreignField: '_id',
                as: 'theater'
              }
            },
            {
              $unwind: '$theater'
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
              $match: {
                $and: [
                  { 'theater.city': { $regex: city, $options: 'i' } },
                  { 'theater.status': true },
                  { 'movie.slug': { $regex: `^${movieId}$`, $options: 'i' } },
                  { 'movie.listed': true },
                ]
              }
            },
            {
              $project: {
                _id: 0,
                movie: 1
              }
            }
          ],
          theaterDetails: [
            {
              $lookup: {
                from: 'theaterowners',
                localField: 'theaterId',
                foreignField: '_id',
                as: 'theater'
              }
            },
            {
              $unwind: '$theater'
            },
            {
              $match: {
                $and: [
                  { 'theater.city': { $regex: city, $options: 'i' } },
                  { 'theater.status': true }
                ]
              }
            },
            {
              $lookup: {
                from: 'theaterscreens',
                localField: 'screenId',
                foreignField: '_id',
                as: 'screenDetails'
              }
            },
            {
              $unwind: '$screenDetails'
            },
            {
              $group: {
                _id: '$theater._id',
                theater: { $first: '$theater' },
                shows: {
                  $push: {
                    screen_name: '$screenDetails.screen_name',
                    screenId: '$screenDetails._id',
                    theaterId: '$screenDetails.theaterId',
                    showDetails: {
                      showTime: '$showTime',
                      endTime: '$endTime',
                      format: '$format',
                      language: '$language',
                      showId: '$_id'
                    }
                  }
                }
              }
            },
            {
              $project: {
                _id: 0,
                'theater.theater_name': 1,
                'theater.city': 1,
                'theater._id': 1,
                'theater.address': 1,
                shows: 1
              }
            }
          ]
        }
      },
      {
        $project: {
          movie: { $arrayElemAt: ['$movieDetails.movie', 0] },
          theaters: '$theaterDetails'
        }
      }
    ]);

    return movies;
  } catch (error) {
    throw error;
  }
}

export { getSingleRunningMovie }