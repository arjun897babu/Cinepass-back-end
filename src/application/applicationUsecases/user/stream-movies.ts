import { isUserRented } from "../../../infrastructure/database/repositories/user"
import { CustomError } from "../../../utils/CustomError"
import { HttpStatusCode, ResponseStatus } from "../../../utils/enum"
import { IUserStreamProps } from "../../../utils/interface"
import { IDependencies } from "../../interface/user/IDependencies"

const streamMovies = (dependencies: IDependencies) => {
  const { repositories: { getSingleStreamingMovie, getStreamingMovies, isUserRented } } = dependencies

  return {
    execute: async (props: Partial<IUserStreamProps>) => {
      try {
        let response

        if (props.movieId) {
          console.log('reaching in get single stream movie use case')
          response = await getSingleStreamingMovie(props.movieId)
          console.log('userId:', props._id, 'movieId:',response?._id)
          if (response?._id && props._id) {
            const isRented = await isUserRented(props._id, response._id)
            console.log(isRented)
            response.isPurchased = isRented
          }
          console.log(response)

        } else if (props.filter) {
          response = await getStreamingMovies(props.filter)
        }

        if (!response) {
          throw new CustomError('no data found', HttpStatusCode.NOT_FOUND, 'stream')
        }
        return {
          status: ResponseStatus.SUCCESS,
          message: 'Data fetched successfully',
          data: response
        }


      } catch (error) {
        throw error
      }
    }
  }
}


export {
  streamMovies
}