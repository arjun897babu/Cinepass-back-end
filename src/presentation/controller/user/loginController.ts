import { NextFunction, Request, Response } from "express"
import { validateEmail, validatePassword } from "../../../utils/validator";
import { CustomError } from "../../../utils/CustomError";
import { IDependencies } from "../../../application/interface/user/IDependencies";

const login = (dependencies: IDependencies) => {
  const { useCases: { loginUseCase } } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      //validate email
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        throw new CustomError(emailValidation.message, 400)
      }

      //validate password
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        throw new CustomError(passwordValidation.message, 400)
      }

      const { accessToken, refreshToken } = await loginUseCase(dependencies).execute(email, password);
      
      // return res.cookie('userJWT', accessToken, {
      //   httpOnly: true,
      //   sameSite: 'lax',
      //   maxAge:   60 * 60 * 1000
      // })  // 30 days
      //   .status(200).json({
      //     status: 'success',
      //     refreshToken,
      //     accessToken,
      //     message: 'User logged in successfully'

      //   })

      return res.status(200).json({
        status:true,
        message:'created successFully'
      })
      } catch (error) {
      next(error)
    }
  }
}

export {
  login
}