import { NextFunction, Request, Response } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { CustomError } from "../../../utils/CustomError";
import { mongodbIdValidator } from "../../../utils/validator";

const manageEntity = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { manageEntityUsecase } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id, role } = req.params;

      if (!_id) {
        throw new CustomError('Invalid request', 400, '_id');
      }
      
      if (!role || (role !== 'user' && role !== 'theaters')) {
        throw new CustomError('Invalid request', 400, 'role');
      }


      mongodbIdValidator(_id);


     

        const response = await manageEntityUsecase(dependencies).execute({ _id, role })
        return res.status(200).json({
          status: response.status,
          message: response.message,
          data: response.data
        })
     
    } catch (error) {
      next(error)
    }
  }
}

export {
  manageEntity
}