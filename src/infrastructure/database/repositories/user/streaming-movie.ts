import { StreamingMovie } from "../../model/admin/streaming-movie"
import { IStreamMovieFilter, StreamingMovieResponse } from "../../../../utils/interface";
import { IStreamingMovieResponse } from "../../../../domain/domainUsecases/user";
import { payments } from "../../model/user/payment-schema";
import { PurchasedItem } from "../../../../utils/enum";
import { ObjectId } from "mongoose";

const getStreamingMovies = async (filter: Partial<IStreamMovieFilter>): Promise<IStreamingMovieResponse | null> => {
  try {
    const [response = null] = await StreamingMovie.aggregate([
      {
        $lookup: {
          from: 'streamplans',
          localField: 'plan',
          foreignField: '_id',
          as: 'streamingPlan'
        }
      },
      { $unwind: '$streamingPlan' },
      {
        $facet: {
          running: [
            {
              $match: {
                release_date: { $lte: new Date() }
              }
            }
          ],
          upcoming: [
            {
              $match: {
                release_date: { $gt: new Date() }
              }
            }
          ]
        }
      }
    ]);
    // console.log('in get all  stream  movie repo :', response)

    return response
  } catch (error) {
    throw error
  }
}
const getSingleStreamingMovie = async (movieId: string): Promise<StreamingMovieResponse | null> => {
  console.log('reaching in  get single stream movie repo :', movieId)
  try {
    const [movie = null] = await StreamingMovie.aggregate([
      {
        $lookup: {
          from: 'streamplans',
          localField: 'plan',
          foreignField: '_id',
          as: 'streamingPlan'
        }
      },
      {
        $unwind: '$streamingPlan'
      },
      {
        $match: {
          $and: [
            { listed: true },
            { 'slug': { $regex: `^${movieId}$`, $options: 'i' } },
          ]
        }
      }
    ])

    // console.log('in single streaming repo :', movie)

    return !movie ? null : movie
  } catch (error) {
    throw error
  }
}

const isUserRented = async (userId: string, movieId: ObjectId): Promise<boolean> => {
  try {
    const isRented = await payments.exists({
      userId, purchasedItem: PurchasedItem.RENTAL, movieId,
      $expr: {
        $gte: [
          {
            $dateAdd: {
              startDate: '$bookingDate',
              unit: 'month',
              amount: '$rentalPlan.validity',
              timezone: 'Asia/Kolkata'
            }
          },
          new Date()
        ]
      }
    })

    return isRented ?
      true
      : false

  } catch (error) {
    throw error
  }
}



export {
  getSingleStreamingMovie, getStreamingMovies,isUserRented
}