import { NextFunction, Request, Response } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { HttpStatusCode } from "../../../utils/enum";
import { CustomError } from "../../../utils/CustomError";

const getStreamingUrl = (dependencies: IAdminDependencies) => {
  const { adminUsecase: {getStreamingUrl } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { publicId } = req.params

      if (!publicId) {
        throw new CustomError('bad request', HttpStatusCode.BAD_REQUEST, 'url')
      }

      const response = await getStreamingUrl(dependencies).execute(publicId)

      res.status(HttpStatusCode.OK).json({
        status: response.status,
        message: response.message,
        data: response.data
      })

    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

export {
  getStreamingUrl
}