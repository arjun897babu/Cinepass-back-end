import { MovieFilter } from "../../../../utils/interface";
import { MovieShow } from "../../model/theaters"

const getSingleRunningMovie = async (
  movieId: string,
  city: string,
  {
    bookingDate = new Date(),
    format = '',
    genre = '',
    language = '',
    search = ''
  }: Partial<MovieFilter>
) => {

  try {

    const today = new Date()
    console.log(today.toDateString().split('T')[0], bookingDate.toDateString().split('T')[0])
    console.log(today.toDateString().split('T')[0] === bookingDate.toDateString().split('T')[0])
    console.log(bookingDate)
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
              $group: {
                _id: null,   
                maxAdvanceBookingPeriod: { $max: '$advanceBookingPeriod' }, 
                movie: { $first: '$movie' }  
              }
            },
            {
              $project: {
                _id: 0,
                maxAdvanceBookingPeriod: 1,  
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
                  { 'movie.listed': true },
                  { 'movie.slug': { $regex: `^${movieId}$`, $options: 'i' } },
                  { openingDate: { $lte: today } }

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
              $addFields: {
                isWithinBookingPeriod: {
                  $cond: {
                    if: { $lte: [bookingDate, '$movie.release_date'] },
                    then: {
                      $lte: [
                        bookingDate,
                        {
                          $dateAdd: {
                            startDate: '$movie.release_date',
                            unit: 'day',
                            amount: { $subtract: ['$advanceBookingPeriod', 1] }
                          }
                        }
                      ]
                    },
                    else: {
                      $lte: [
                        bookingDate,
                        {
                          $dateAdd: {
                            startDate: {
                              $cond: {
                                if: { $gte: [today, '$movie.release_date'] },
                                then: today,
                                else: '$movie.release_date'
                              }
                            },
                            unit: 'day',
                            amount: { $subtract: ['$advanceBookingPeriod', 1] }
                          }
                        }
                      ]
                    }
                  }
                },
                bookingClosed: {
                  $cond: {
                    if: {
                      $and: [
                        {
                          $eq: [
                            {
                              $dateToString: {
                                date: new Date(),
                                format: "%Y-%m-%d"
                              }
                            },
                            {
                              $dateToString: {
                                date: new Date(`${bookingDate}`),
                                format: "%Y-%m-%d"
                              }
                            }
                          ]
                        },
                        {
                          $gte: [
                            {
                              $dateFromString: {
                                dateString: {
                                  $dateToString: {
                                    date: new Date(),
                                    format: "%Y-%m-%dT%H:%M:%S",
                                    timezone: "Asia/Kolkata"
                                  }
                                }
                              }
                            },
                            {
                              $dateSubtract: {
                                startDate: {
                                  $dateFromString: {
                                    dateString: {
                                      $concat: [
                                        {
                                          $dateToString: {
                                            date: new Date(),
                                            format: "%Y-%m-%d",
                                            timezone: "Asia/Kolkata"
                                          }
                                        },
                                        "T",
                                        "$showTime"
                                      ]
                                    }
                                  }
                                },
                                unit: "minute",
                                amount: 30
                              }
                            }
                          ]
                        }
                      ]
                    },
                    then: true,
                    else: false
                  }
                }

              },

            },
            {
              $match: {
                isWithinBookingPeriod: true,
                bookingClosed: false
              }
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
                      showId: '$_id',
                      slug: '$slug',
                      allowCancelation: '$allowCancelation',
                      cancelationDeadline: '$cancelationDeadline',
                    }
                  }
                },
              }
            },
            {
              $project: {
                _id: 0,
                'theater.theater_name': 1,
                'theater.city': 1,
                'theater._id': 1,
                'theater.address': 1,
                shows: {
                  $sortArray: {
                    input: '$shows',
                    sortBy: { 'showDetails.showTime': 1 }
                  }
                },
              }
            }
          ]
        }
      },
      {
        $project: {
          movie: { $arrayElemAt: ['$movieDetails.movie', 0] },
          maxAllocatedDays:{ $arrayElemAt: ['$movieDetails.maxAdvanceBookingPeriod', 0] },
          theaters: {
            $sortArray: {
              input: '$theaterDetails',
              sortBy: { 'theater.theater_name': 1 }
            }
          }
        }
      }
    ]);

    console.log(movies)

    return movies;
  } catch (error) {
    throw error;
  }
}

export { getSingleRunningMovie }
