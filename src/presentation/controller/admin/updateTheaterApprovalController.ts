import { NextFunction, Request, Response } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { CustomError } from "../../../utils/CustomError";
import { ApprovalStatus } from "../../../domain/entities/common";
import { mongodbIdValidator } from "../../../utils/validator";

const updateTheaterApprovalByAdmin = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { updateTheaterApprovalByAdminUseCase } } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { theaterOwnerId } = req.params
      const { approval_status } = req.body

      if (!theaterOwnerId || !approval_status) {
        throw new CustomError('Invalid request', 400, 'Bad request')
      }

      mongodbIdValidator(theaterOwnerId);

      // Validating the  approval status
      if (!Object.values(ApprovalStatus).includes(approval_status)) {
        throw new CustomError('Invalid approval status', 400, 'Bad request');
      }

      const response = await updateTheaterApprovalByAdminUseCase(dependencies).execute({ theaterOwnerId, approval_status });

      return res.status(200).json({
        status: response.status,
        message: response.message,
        data: response.data,
      })

    } catch (error) {
      next(error)
    }
  }
}

export {
  updateTheaterApprovalByAdmin
}