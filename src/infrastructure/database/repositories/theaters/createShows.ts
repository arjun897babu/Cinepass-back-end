import { IMovieShow } from "../../../../domain/entities/theaters";
import { CustomError } from "../../../../utils/CustomError";
import { MovieShow } from "../../model/theaters";

const createMovieShows = async (_id: string, payload: Omit<IMovieShow, 'theaterId'>): Promise<IMovieShow> => {
  try {

    const isExists = await MovieShow.exists({
      $and: [
        { screenId: payload.screenId },
        { listed: true },
        {
          $or: [
            {
              // Check if the new show has any overlap with existing shows
              $and: [
                { showTime: { $lte: payload.endTime } },
                { endTime: { $gte: payload.showTime } }
              ]
            },
            {
              // Check if the existing show is fully within the new show
              $and: [
                { showTime: { $gte: payload.showTime } },
                { endTime: { $lte: payload.endTime } }
              ]
            }
          ]
        }
      ]
    });

    console.log('in create movie show repositories', isExists)
    if (isExists) {
      throw new CustomError('show already scheduled during the time', 400, 'movieId')
    }

    const newShow = await MovieShow.create({ theaterId: _id, ...payload });
    return newShow;
  } catch (error) {
    throw error
  }
};

export {
  createMovieShows
};
