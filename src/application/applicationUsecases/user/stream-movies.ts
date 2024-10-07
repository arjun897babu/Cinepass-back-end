import { CustomError } from "../../../utils/CustomError"
import { HttpStatusCode, ResponseStatus } from "../../../utils/enum"
import { IUserStreamProps } from "../../../utils/interface"
import { IDependencies } from "../../interface/user/IDependencies"

const streamMovies = (dependencies: IDependencies) => {
  const { repositories: { getSingleStreamingMovie, getStreamingMovies } } = dependencies

  return {
    execute: async (props: Partial<IUserStreamProps>) => {
      try {
        console.log('reaching in  stream movie use case')
        let response

        if (props.movieId) {
          console.log('reaching in single stream movie use case')
          response = await getSingleStreamingMovie(props.movieId)
        } else if (props.filter) {
          console.log('reaching in get all stream movie use case')
          response = await getStreamingMovies(props.filter)
        }

        if(!response){
          throw new CustomError('no data found',HttpStatusCode.NOT_FOUND,'stream')
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