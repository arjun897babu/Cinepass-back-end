import { NextFunction, Request, Response } from "express"
import { validateEmail, validatePassword } from "../../../utils/validator";
import { CustomError } from "../../../utils/CustomError";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { Cookie } from "../../../utils/jwtHandler";

const adminLogin = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { adminLoginUseCase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('req received in admin login controller')
      const { email, password } = req.body;
      if (!email && !password) {
        throw new CustomError('All fields are required', 401, '')
      }

      validateEmail(email);
      validatePassword(password);
      
      const response = await adminLoginUseCase(dependencies).execute({ email, password })

      return res.cookie(Cookie.adminJWT, response.accessToken, {
        httpOnly: true, 
        maxAge: 24 * 60 * 60 * 1000,
      })
        .status(200).json({
          message: response.message,
          status: response.status,
          data: response.data,
          redirectURL: response.redirectURL
        })

    } catch (error) {
      next(error)
    }
  }
}


export {
  adminLogin
}