import { Types } from "mongoose"
import { MovieShow } from "../../model/theaters"
import { IReservedSeats } from "../../../../domain/entities/theaters"
import { CustomError } from "../../../../utils/CustomError"
import { HttpStatusCode } from "../../../../utils/enum"
import { ICheckShowAvailableResponse } from "../../../../utils/interface"

const checkShowAvailable = async (showId: string, payload: IReservedSeats): Promise<ICheckShowAvailableResponse> => {

  // console.log('In check show available repository', showId, payload)
  try {
    const [isShowAvailable] = await MovieShow.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(showId),
          listed: true
        }
      },
      {
        $lookup: {
          from: 'theaterowners',
          localField: 'theaterId',
          foreignField: '_id',
          as: 'theater'
        }
      },
      { $unwind: '$theater' },
      {
        $lookup: {
          from: 'theatermovies',
          localField: 'movieId',
          foreignField: '_id',
          as: 'movie'
        }
      },
      { $unwind: '$movie' },
      {
        $lookup: {
          from: 'theaterscreens',
          localField: 'screenId',
          foreignField: '_id',
          as: 'screen'
        }
      },
      { $unwind: '$screen' },
      {
        $facet: {
          movieDetails: [
            {
              $project: {
                movie_name: '$movie.movie_name',
                movie_poster: '$movie.movie_poster',
                release_date: '$movie.release_date'
              }
            }
          ],
          showDetails: [
            {
              $project: {
                _id: 0,
                movieId: '$movieId',
                screenId: '$screenId',
                showId: '$_id',
                reserved: {
                  $filter: {
                    input: '$reserved',
                    as: 'item',
                    cond: {
                      $eq: ['$$item.bookingDate', payload.bookingDate]
                    }
                  }
                },
                slug: '$slug',
                format: "$format",
                language: "$language",
                showTime: "$showTime",
                endTime: '$endTime',
                cancelationDeadline: '$cancelationDeadline'
              }
            }
          ],
          theaterDetails: [
            {
              $match: {
                'theater.status': true
              }
            },
            {

              $project: {
                _id: '$theater._id',
                theater_name: '$theater.theater_name',
                city: '$theater.city',
                slug: '$theater.slug',
              },

            }
          ],
          screenDetails: [
            {
              $match: {
                'screen.listed': true
              }
            },
            { $unwind: '$screen.layout' },
            { $unwind: '$screen.layout' },
            {
              $match: {
                $and: [
                  {
                    "screen.layout.name": {
                      $in: payload.reservedSeats
                    }
                  },
                  {
                    "screen.layout.available": true
                  }
                ]
              }
            },
            {
              $project: {
                _id: '$screen._id',
                chargePerSeat: '$screen.chargePerSeat',
                screen_name: '$screen.screen_name',
                amenity: '$screen.amenity',
                layout: '$screen.layout'
              }
            },
          ]
        }
      },
      {
        $project: {
          showDetails: { $arrayElemAt: ['$showDetails', 0] },
          theaterDetails: { $arrayElemAt: ['$theaterDetails', 0] },
          screenDetails: 1,
          movieDetails: { $arrayElemAt: ['$movieDetails', 0] }
        }
      },

      {
        $match: {
          $or: [
            {
              "showDetails.reserved": { $exists: true, $eq: [] }
            },
            {
              'showDetails.reserved': {
                $not: {
                  $elemMatch: {
                    reservedSeats: { $in: payload.reservedSeats }
                  }
                }
              }
            }
          ]
        }
      }

    ])

    if (!isShowAvailable) {
      throw new CustomError('seats not available', HttpStatusCode.BAD_REQUEST, 'seats')
    }

    return isShowAvailable
  } catch (error) {
    throw error
  }
}


export {
  checkShowAvailable
}