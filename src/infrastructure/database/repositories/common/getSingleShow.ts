import { Types } from "mongoose"
import { MovieShow } from "../../model/theaters"
import { IMovie } from "../../../../domain/entities/admin/ITheaterMovie"
import { CustomError } from "../../../../utils/CustomError"
import { IGetSingleShow } from "../../../../utils/interface"

const getSingleShow = async (_id: string): Promise<IGetSingleShow> => {
  try {
 
    const showDetails = await MovieShow.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(_id),
          listed: true,
          opening_date:{$lte:new Date()}
        }
      },
      {
        $lookup: {
          from: 'theatermovies',
          localField: 'movieId',
          foreignField: '_id',
          as: 'movie',
        },
      },
      { $unwind: '$movie' },
      {
        $lookup: {
          from: 'theaterscreens',
          localField: 'screenId',
          foreignField: '_id',
          as: 'screen',
        },
      },
      { $unwind: '$screen' },
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
        $project: {
          movie: {
            movie_name: '$movie.movie_name',
          },
          theater: {
            theater_name: '$theater.theater_name'
          },
          screen:'$screen',
          show: {
            reserved: '$reserved',
            format: '$format',
            _id: '$_id',
            showTime: '$showTime',
            language: '$language'
          }

        }
      }
    ])
    console.log('in getsingleshow repostitory',showDetails)
    if (!showDetails.length) {
      throw new CustomError('show not found', 404, 'show')
    }
    return showDetails[0]
  } catch (error) {
    throw error
  }
}

export {
  getSingleShow
}