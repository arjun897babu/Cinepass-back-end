import { Request, Response, NextFunction } from "express"
import { IDependencies } from "../../../application/interface/user/IDependencies"
import { validateEmail, validateMobileNumber, validateName } from "../../../utils/validator"
import { CustomError } from "../../../utils/CustomError"

const signup = (dependencies: IDependencies) => {

  const { useCases: { signupUseCase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { name, email, mobile_number, password } = req.body

      //validating name
      const nameValidation = validateName(name);
      if (!nameValidation.isValid) {
        throw new CustomError(nameValidation.message, 400, 'name')
      }

      //validating email
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        throw new CustomError(emailValidation.message, 400, 'email')
      }

      //validating mobile_number
      const mobileNumberValidation = validateMobileNumber(mobile_number);
      if (!mobileNumberValidation.isValid) {
        throw new CustomError(mobileNumberValidation.message, 400, 'mobile_number')
      }

      const response = await signupUseCase(dependencies).execute({ name, email, mobile_number, password })

      return res.status(201).json({
        status: response?.status,
        message: response?.message,
        redirectURL: response?.redirectURL
      });

    } catch (error) {
      next(error)
    }

  }
}

export {
  signup
}