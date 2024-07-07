
interface ReturnObject {
  message: string;
  isValid: boolean
}

const nameRegex = /^[a-zA-Z]{3,20}(?: [a-zA-Z]+)*$/
const emailRegex =/^(?=.{11,100}$)([a-zA-Z\d]+([.-_]?[a-zA-Z\d]+)*)\@([a-zA-Z]{5,9})+\.com$/
const mobileNumberRegex = /^\d{10}$/

const validateName = (name: string): ReturnObject => {
  name = name.trim();

  if (name === '') {
    return {
      message: 'Name cannot be empty.',
      isValid: false
    };
  }

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
  mobileNumber = mobileNumber.trim()
  if (mobileNumber === '') {
    return {
      message: 'Mobile number cannot be empty',
      isValid: false
    }
  }

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

  email = email.trim()
  if (email === '') {
    return {
      message: 'Email address cannot be empty',
      isValid: false
    }
  }

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

const validatePassword = (password:string):ReturnObject=>{
  password = password.trim()
  return{
    message:'Password is valid',
    isValid:true
  }
}

export {
  validateName,
  validateMobileNumber,
  validateEmail,
  validatePassword
}