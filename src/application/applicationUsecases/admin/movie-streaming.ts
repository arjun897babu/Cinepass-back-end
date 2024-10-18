import { getHlsUrl } from "../../../infrastructure/cloudinary";
import { ResponseStatus } from "../../../utils/enum";
import { IAdminDependencies } from "../../interface/admin/IAdminDependencies";

const getStreamingUrl = (dependencies: IAdminDependencies) => {
  const { } = dependencies

  return {
    execute: async (publicId: string) => {
      try {
        const response = getHlsUrl(publicId)
        return {
          status: ResponseStatus.SUCCESS,
          message: 'url fetched successfully',
          data: response
        }

      } catch (error) {
        throw error
      }
    }
  }
}

export {
  getStreamingUrl
}