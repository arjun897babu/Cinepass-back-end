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
      const emailValidation = validateEmail(email);
      const passwordValidation = validatePassword(password);
      if (!emailValidation.isValid) {
        throw new CustomError(emailValidation.message, 401, 'email');
      }
      if (!passwordValidation) {
        throw new CustomError(emailValidation.message, 401, 'password')
      }

      const response = await adminLoginUseCase(dependencies).execute({ email, password })

      return res.cookie(Cookie.adminJWT, response.accessToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24*60 * 60 * 1000,
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