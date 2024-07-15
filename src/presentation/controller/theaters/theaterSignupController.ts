import { NextFunction, Request, Response } from "express"
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies"
import { validateAdhaar, validateEmail, validateMobileNumber, validateName, validatePassword, validateTheaterLicense, validateTheaterName } from "../../../utils/validator"
import { CustomError } from "../../../utils/CustomError"
import { log } from "console"

const theaterSignup = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { theaterSignupUseCase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      //name validation
      const nameValidation = validateName(payload.name)
      if (!nameValidation.isValid) {
        throw new CustomError(nameValidation.message, 400, 'name')
      }
      //email validation
      const emailValidation = validateEmail(payload.email)
      if (!emailValidation.isValid) {
        throw new CustomError(emailValidation.message, 400, 'email')
      }
      //mobile number validation
      const mobileNumberValidaton = validateMobileNumber(payload.mobile_number)
      if (!mobileNumberValidaton.isValid) {
        throw new CustomError(mobileNumberValidaton.message, 400, 'mobile_number')
      }
      //password validation
      const passwordValidation = validatePassword(payload.password);
      if (!passwordValidation.isValid) {
        throw new CustomError(passwordValidation.message, 400, 'password')
      }
      //adhaar validation
      const adhaarNumberValidation = validateAdhaar(payload.adhaar_number);
      if (!adhaarNumberValidation.isValid) {
        throw new CustomError(adhaarNumberValidation.message, 400, 'adhaar_number')
      }
       //theater name
       const theaterName = validateTheaterName(payload.theater_name);
       if (!theaterName.isValid) {
        console.log('theater name error');
        
         throw new CustomError(theaterName.message, 400, 'Invalid theater name')
       }
 
      //theater license validaton
      const theaterLicenseValidation = validateTheaterLicense(payload.theater_license);
      if (!theaterLicenseValidation.isValid) {
        throw new CustomError(theaterLicenseValidation.message, 400, 'theater_license')
      }

      const response = await theaterSignupUseCase(dependencies).execute(payload);

      return res.status(201).json({
        message: response?.message,
        status: response?.status,
        data: response?.data,
        redirectURL: response?.redirectURL
      })
    } catch (error) {
      next(error)
    }

  }
}

export {
  theaterSignup
}