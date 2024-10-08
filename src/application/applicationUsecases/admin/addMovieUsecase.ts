import { promises, unlink } from "fs";
import { IMovie } from "../../../domain/entities/admin/ITheaterMovie";
import { ImageUploadResult, uploadVideo } from "../../../infrastructure/cloudinary";
import { MovieType, ResponseStatus, Role } from "../../../utils/enum";
import { IAdminDependencies } from "../../interface/admin/IAdminDependencies";

const addMovieUsecase = (dependencies: IAdminDependencies) => {
  const { adminRepositories: { addMovie } } = dependencies

  return {
    execute: async (payload: IMovie, movieType: MovieType, filePath?: string) => {
      try {
        console.log('filepath:', filePath)
        if (movieType === MovieType.STREAM && filePath) {
 
          const response = await uploadVideo(filePath, Role.admin)

          // console.log('in add movie use case admin side', response)
          
          unlink(filePath, (err) => {
            if (err) {
              console.log('error while deleting the file form the server:', err)
            }
          })

          payload.file = {
            public_id: response.public_id,
            secure_url: response.secure_url,
          } as ImageUploadResult;
        }

        const newMovie = await addMovie(payload, movieType);
        return {
          status: ResponseStatus.SUCCESS,
          message: 'Movie added successfully',
          data: { movie: newMovie },
          redirectURL: '#'
        }
      } catch (error) {

        throw error
      }
    }
  }
}
export {
  addMovieUsecase
}