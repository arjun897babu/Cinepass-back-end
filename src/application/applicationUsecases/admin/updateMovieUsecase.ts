import { IAdminDependencies } from "../../interface/admin/IAdminDependencies";
import { IMovie } from "../../../domain/entities/admin/ITheaterMovie";
import { CustomError } from "../../../utils/CustomError";
import { unlink } from "fs";
import {
  MovieType,
  ResponseStatus,
  Role
} from "../../../utils/enum";
import {
  deleteVideo,
  ImageUploadResult,
  uploadVideo
} from "../../../infrastructure/cloudinary";

const updateMovieUsecase = (dependencies: IAdminDependencies) => {
  const { adminRepositories: { updateMovie } } = dependencies
  return {
    execute: async (movieId: string, payload: IMovie, movieType: MovieType, filePath?: string, publicId?: string) => {
      try {
          console.log(filePath,publicId)
        if (movieType === MovieType.STREAM && filePath && publicId) {
          await deleteVideo(publicId)
          const response = await uploadVideo(filePath, Role.admin)
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

        const movie = await updateMovie(movieId, payload, movieType)

        if (!movie) {
          throw new CustomError('no data found', 404, 'movie')
        }

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Movie updated Successfully',
          data: { movie }
        }
      } catch (error) {
        throw error
      }
    }
  }
}


export {
  updateMovieUsecase
}