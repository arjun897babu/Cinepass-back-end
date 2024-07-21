import { isValidObjectId } from "mongoose";
import { CustomError } from "./CustomError";

interface ReturnObject {
  message: string;
  isValid: boolean
}

const nameRegex = /^[a-zA-Z]{3,20}(?: [a-zA-Z]+)*$/
const emailRegex = /^(?=.{11,100}$)([a-zA-Z\d]+([.-_]?[a-zA-Z\d]+)*)\@([a-zA-Z]{4,9})+\.com$/
const mobileNumberRegex = /^\d{10}$/
const adhaarRegex = /^\d{12}$/
const theaterNameRegex = /^[a-zA-Z0-9,.]{5,100}(?: [a-zA-Z0-9,.]+)*$/

const validateName = (name: string): ReturnObject => {
  
  if (!name || name === '') {
    return {
      message: 'Name cannot be empty.',
      isValid: false
    };
  }
  
  name = name.trim();

  if (name.length < 3) {
    return {
      message: 'Name must be at least 3 characters long.',
      isValid: false
    };
  }

  if (!nameRegex.test(name)) {
    return {
      message: 'Invalid name format',
      isValid: false
    };
  }

  return {
    message: 'Name is valid.',
    isValid: true
  };
};

const validateMobileNumber = (mobileNumber: string): ReturnObject => {
  if (!mobileNumber || mobileNumber === '') {
    return {
      message: 'Mobile number cannot be empty',
      isValid: false
    }
  }
  
  mobileNumber = mobileNumber.trim()

  if (mobileNumber.length !== 10) {
    return {
      message: 'Mobile number should be ten digits',
      isValid: false
    }
  }

  if (!mobileNumberRegex.test(mobileNumber)) {
    return {
      message: 'Invalid mobile number',
      isValid: false
    }
  }

  return {
    message: 'Mobile number is valid',
    isValid: true
  }
}

const validateEmail = (email: string): ReturnObject => {
  
  if (!email || email === '') {
    return {
      message: 'Email address cannot be empty',
      isValid: false
    }
  }
  
  email = email.trim()
  
  if (!emailRegex.test(email)) {
    return {
      message: 'Invalid email address',
      isValid: false
    }
  }

  return {
    message: 'Email is valid',
    isValid: true
  }
}

const validatePassword = (password: string): ReturnObject => {
  if (password === '' || !password) {
    return {
      message: 'Password is required',
      isValid: true
    }
  }
  password = password.trim()

  return {
    message: 'Password is valid',
    isValid: true
  }
}

const validateAdhaar = (adhaarNumber: string): ReturnObject => {
  if (!adhaarNumber || adhaarNumber == '') {
    return {
      isValid: false,
      message: 'aaddhaar number is required'
    }
  }
  adhaarNumber = adhaarNumber.trim()

  if (!adhaarRegex.test(adhaarNumber)) {

    return {
      message: 'Invalid adhaar number',
      isValid: false,
    }
  }
  return {
    message: 'adhaar is valid',
    isValid: true
  }
};

const validateTheaterLicense = (theaterLicense: string): ReturnObject => {
  if (!theaterLicense || theaterLicense === '') {
    return {
      isValid: false,
      message: 'Theater license is required'
    }
  }
  theaterLicense = theaterLicense.trim()

  return {
    message: 'adhaar is valid',
    isValid: true
  }
}

const validateTheaterName = (theaterName: string): ReturnObject => {
  if (!theaterName || theaterName === '') {
    return {
      isValid: false,
      message: 'Theater name is required'
    }
  }
  theaterName = theaterName.trim()
  
  if (!theaterNameRegex.test(theaterName)) {
    return {
      message: 'Invalid adhaar number',
      isValid: false,
    }
  }
  return {
    message: 'adhaar is valid',
    isValid: true
  }
};

const mongodbIdValidator = (_id: string): void => {

  if ((!_id) || !isValidObjectId(_id)) {
    throw new CustomError('Invalid request', 400, '_id')
  }
}

export {
  validateName,
  validateMobileNumber,
  validateEmail,
  validatePassword,
  validateAdhaar,
  validateTheaterLicense,
  validateTheaterName,
  mongodbIdValidator
}