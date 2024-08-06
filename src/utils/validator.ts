import { isValidObjectId } from "mongoose";
import { CustomError } from "./CustomError";
import { MovieType } from "./enum";

const nameRegex = /^[a-zA-Z]{3,20}(?: [a-zA-Z]+)*$/
const emailRegex = /^(?=.{11,100}$)([a-zA-Z\d]+([.-_]?[a-zA-Z\d]+)*)\@([a-zA-Z]{4,9})+\.com$/
const mobileNumberRegex = /^\d{10}$/
const adhaarRegex = /^\d{12}$/
const movieNameRegex = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*[\-:(),.']{0,150}$/
const theaterNameRegex = /^[a-zA-Z0-9,.]{5,100}(?: [a-zA-Z0-9,.]+)*$/

const validateName = (name: string): void => {
  if (!name || name === '') {
    throw new CustomError('Name cannot be empty.', 400, 'name');
  }

  name = name.trim();

  if (name.length < 3) {
    throw new CustomError('Name must be at least 3 characters long.', 400, 'name');
  }

  if (!nameRegex.test(name)) {
    throw new CustomError('Invalid name format.', 400, 'name');
  }
};

const validateMobileNumber = (mobileNumber: string): void => {
  if (!mobileNumber || mobileNumber === '') {
    throw new CustomError('Mobile number cannot be empty.', 400, 'mobileNumber');
  }

  mobileNumber = mobileNumber.trim();

  if (mobileNumber.length !== 10) {
    throw new CustomError('Mobile number should be ten digits.', 400, 'mobileNumber');
  }

  if (!mobileNumberRegex.test(mobileNumber)) {
    throw new CustomError('Invalid mobile number.', 400, 'mobileNumber');
  }
};

const validateEmail = (email: string): void => {
  if (!email || email === '') {
    throw new CustomError('Email address cannot be empty.', 400, 'email');
  }

  email = email.trim();

  if (!emailRegex.test(email)) {
    throw new CustomError('Invalid email address.', 400, 'email');
  }
};

const validatePassword = (password: string): void => {
  if (password === '' || !password) {
    throw new CustomError('Password is required.', 400, 'password');
  }
};

const validateAdhaar = (adhaarNumber: string): void => {
  if (!adhaarNumber || adhaarNumber === '') {
    throw new CustomError('Aadhaar number is required.', 400, 'adhaarNumber');
  }

  adhaarNumber = adhaarNumber.trim();

  if (!adhaarRegex.test(adhaarNumber)) {
    throw new CustomError('Invalid Aadhaar number.', 400, 'adhaarNumber');
  }
};

const validateTheaterLicense = (theaterLicense: string): void => {
  if (!theaterLicense || theaterLicense === '') {
    throw new CustomError('Theater license is required.', 400, 'theaterLicense');
  }
};

const validateTheaterName = (theaterName: string): void => {
  if (!theaterName || theaterName === '') {
    throw new CustomError('Theater name is required.', 400, 'theaterName');
  }

  theaterName = theaterName.trim();

  if (!theaterNameRegex.test(theaterName)) {
    throw new CustomError('Invalid Theater Name.', 400, 'theaterName');
  }
};

const validateAddress = (address: string): void => {
  if (!address || address === '') {
    throw new CustomError('Address is required.', 400, 'address');
  }
};

const validateCity = (city: string): void => {
  if (!city || city === '') {
    throw new CustomError('City is required.', 400, 'city');
  }
};

const validateImage = (images: string[]): void => {
  if (!images || images.length < 1) {
    throw new CustomError('At least one image is required.', 400, 'images');
  }
};

const validateMovieName = (movieName: string): void => {
  if (!movieName || movieName === '') {
    throw new CustomError('Movie name is required.', 400, 'movieName');
  }

  movieName = movieName.trim();

  if (!movieNameRegex.test(movieName)) {
    throw new CustomError('Invalid movie name.', 400, 'movieName');
  }
};

const validateLanguage = (language: string[]): void => {
  if (!language || language.length < 1) {
    throw new CustomError('At least one language is required.', 400, 'language');
  }
};

const validateGenre = (genre: string[]): void => {
  if (!genre || genre.length < 1) {
    throw new CustomError('At least one genre is required.', 400, 'genre');
  }
};

const validateFormat = (format: string[]): void => {
  if (!format || format.length < 1) {
    throw new CustomError('At least one format is required.', 400, 'format');
  }
};

const mongodbIdValidator = (_id: string): void => {
  if (!_id || !isValidObjectId(_id)) {
    throw new CustomError('Invalid request', 400, '_id');
  }
};

const validateMovieType = (movieType: string) => {
  
  if (!Object.values(MovieType).includes(movieType as MovieType)) {
    throw new CustomError('Bad Request', 400, 'Invalid movieType');
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
  validateAddress,
  validateCity,
  validateImage,
  validateMovieName,
  validateLanguage,
  validateGenre,
  validateFormat,
  mongodbIdValidator,
  validateMovieType
};
