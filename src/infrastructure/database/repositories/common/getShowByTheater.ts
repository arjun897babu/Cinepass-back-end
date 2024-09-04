

import { MovieShow } from "../../model/theaters"
import { ApprovalStatus } from "../../../../domain/entities/common"
import { IGetShowByTheater } from "../../../../utils/interface"
import { CustomError } from "../../../../utils/CustomError"

const getShowByTheater = async (theaterId: string, city: string):Promise<IGetShowByTheater> => {

  try {
    const shows = await MovieShow.aggregate([
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
        $match: {
          $and: [
            { 'theater.slug': theaterId },
            { 'theater.verified': true },
            { 'theater.status': true },
            { 'theater.approval_status': ApprovalStatus.APPROVED },
            { 'theater.city': { $regex: city, $options: 'i' } },
          ]
        }
      },
      {
        $lookup: {
          from: 'theatermovies',  
          localField: 'movieId',
          foreignField: '_id',
          as: 'movies',
        },
      },
      { $unwind: '$movies' },  
      {
        $lookup: {
          from: 'theaterscreens', 
          localField: 'screenId',
          foreignField: '_id',
          as: 'screens',
        },
      },
      { $unwind: '$screens' },
      {
        $group:{
          _id:'$movies._id',
          movie:{$first:'$movies'},
          shows:{
            $push:{
              showDetails: {
                showTime: '$showTime',
                endTime: '$endTime',
                format: '$format',
                language: '$language',
                showId: '$_id',
                opening_date:'$opening_date'
              },
              screenDetails:{
                screen_name:'screens.screen_name',
                _id:'$screens._id',
                theaterId:'$screens.theaterId',
                chargePerSeat:'$screens.chargePerSeat'
              }
            }
          }
        }
      }
    ])

    if(!shows.length){
      throw new CustomError('show not found',404,'show')
    }

    return shows[0]
  } catch (error) {
    throw error
  }
}

export {
  getShowByTheater
}