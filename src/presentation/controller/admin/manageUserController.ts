import { NextFunction, Request, Response } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { CustomError } from "../../../utils/CustomError";
import { mongodbIdValidator } from "../../../utils/validator";
import { HttpStatusCode, Role } from "../../../utils/enum";

const manageEntity = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { manageEntityUsecase } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { entityId, role } = req.params;
     
      if (!entityId) {
        throw new CustomError('Invalid request', 400, 'entityId');
      }

      if (!role || (role !== Role.users && role !== Role.theaters)) {
        console.log('jjjjjjjjjjj')
        throw new CustomError('Invalid request', 400, 'role');
      }

      mongodbIdValidator(entityId);

      const response = await manageEntityUsecase(dependencies).execute({ entityId, role })
      return res.status(HttpStatusCode.OK).json({
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