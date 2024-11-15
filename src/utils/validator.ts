import { isValidObjectId } from "mongoose";
import { CustomError } from "./CustomError";
import { ApprovalStatus, HttpStatusCode, MovieType, Role } from "./enum";
import { MxRecord, promises } from "dns";
const nameRegex = /^[a-zA-Z]{3,20}(?: [a-zA-Z]+)*$/;
const emailRegex =
  /^(?=.{11,100}$)([a-zA-Z\d]+([.-_]?[a-zA-Z\d]+)*)\@([a-zA-Z]{4,9})+\.com$/;
const mobileNumberRegex = /^\d{10}$/;
const adhaarRegex = /^\d{12}$/;
const movieNameRegex = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*[\-:(),.']{0,150}$/;
const theaterNameRegex = /^[a-zA-Z0-9,.]{5,100}(?: [a-zA-Z0-9,.]+)*$/;

const errorMessage = (field: string): string => `${field} is required`;

const throwRequiredError = (
  field: string,
  statusCode: HttpStatusCode
): never => {
  throw new CustomError(errorMessage(field), statusCode, field);
};

const isEmpty = (value: string, field: string) => {
  if (!value || value.trim() === "") {
    throwRequiredError(field, HttpStatusCode.BAD_REQUEST);
  }
};

const validateName = (name: string): void => {
  isEmpty(name, "name");
  name = name.trim();

  if (name.length < 3) {
    throw new CustomError(
      "Name must be at least 3 characters long.",
      HttpStatusCode.BAD_REQUEST,
      "name"
    );
  }

  if (!nameRegex.test(name)) {
    throw new CustomError(
      "Invalid name format.",
      HttpStatusCode.BAD_REQUEST,
      "name"
    );
  }
};

const validateMobileNumber = (mobileNumber: string): void => {
  isEmpty(mobileNumber, "mobileNumber");

  mobileNumber = mobileNumber.trim();

  if (mobileNumber.length !== 10) {
    throw new CustomError(
      "Mobile number should be ten digits.",
      HttpStatusCode.BAD_REQUEST,
      "mobileNumber"
    );
  }

  if (!mobileNumberRegex.test(mobileNumber)) {
    throw new CustomError(
      "Invalid mobile number.",
      HttpStatusCode.BAD_REQUEST,
      "mobileNumber"
    );
  }
};

const validateEmail = (email: string): void => {
  isEmpty(email, "email");
  email = email.trim();

  if (!emailRegex.test(email)) {
    throw new CustomError(
      "Invalid email address.",
      HttpStatusCode.BAD_REQUEST,
      "email"
    );
  }
};

const validatePassword = (password: string): void => {
  isEmpty(password, "password");

  type IPassword = { [key: string]: RegExp };
  const regex: IPassword = {
    "upper case": /[A-Z]/,
    "lower Case": /[a-z]/,
    number: /\d/,
    "special char": /[-/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/,
    length: /^.{6,20}$/,
  };

  for (let criteria in regex) {
    const regExpexpression = regex[criteria as keyof IPassword];
    if (!regExpexpression.test(password)) {
      throw new CustomError(
        `at least one ${errorMessage(criteria)}`,
        HttpStatusCode.BAD_REQUEST,
        "password"
      );
    }
  }
};

const validateAdhaar = (adhaarNumber: string): void => {
  isEmpty(adhaarNumber, "adhaarNumber");

  adhaarNumber = adhaarNumber.trim();

  if (!adhaarRegex.test(adhaarNumber)) {
    throw new CustomError(
      "Invalid Aadhaar number.",
      HttpStatusCode.BAD_REQUEST,
      "adhaarNumber"
    );
  }
};

const validateTheaterLicense = (theaterLicense: string): void => {
  isEmpty(theaterLicense, "theaterLicense");
};

const validateTheaterName = (theaterName: string): void => {
  isEmpty(theaterName, "theaterName");
  theaterName = theaterName.trim();

  if (!theaterNameRegex.test(theaterName)) {
    throw new CustomError(
      "Invalid Theater Name.",
      HttpStatusCode.BAD_REQUEST,
      "theaterName"
    );
  }
};

const validateAddress = (address: string): void => {
  isEmpty(address, "address");
};

const validateCity = (city: string): void => {
  isEmpty(city, "city");
};

const validateImage = (images: string): void => {
  isEmpty(images, "images");
};

const validateMovieName = (movieName: string): void => {
 isEmpty(movieName,'movieName')

  movieName = movieName.trim();

  if (!movieNameRegex.test(movieName)) {
    throw new CustomError(
      "Invalid movie name.",
      HttpStatusCode.BAD_REQUEST,
      "movieName"
    );
  }
};

const validateLanguage = (language: string[]): void => {
  if (!language || language.length < 1) {
    throw new CustomError(
      "At least one language is required.",
      HttpStatusCode.BAD_REQUEST,
      "language"
    );
  }
};

const validateGenre = (genre: string[]): void => {
  if (!genre || genre.length < 1) {
    throw new CustomError(
      "At least one genre is required.",
      HttpStatusCode.BAD_REQUEST,
      "genre"
    );
  }
};

const validateFormat = (format: string[]): void => {
  if (!format || format.length < 1) {
    throw new CustomError(
      "At least one format is required.",
      HttpStatusCode.BAD_REQUEST,
      "format"
    );
  }
};

const mongodbIdValidator = (_id: string): void => {
  if (!_id || !isValidObjectId(_id)) {
    throw new CustomError("Invalid request", HttpStatusCode.BAD_REQUEST, "_id");
  }
};
const validateRole = (role: string) => {
  if (!Object.values(Role).includes(role as Role)) {
    throw new CustomError(
      "Bad Request",
      HttpStatusCode.BAD_REQUEST,
      "Invalid role"
    );
  }
};
const validateMovieType = (movieType: string) => {
  if (!Object.values(MovieType).includes(movieType as MovieType)) {
    throw new CustomError(
      "Bad Request",
      HttpStatusCode.BAD_REQUEST,
      "Invalid movieType"
    );
  }
};
const validateApprovalStatus = (approvalStatus: ApprovalStatus) => {
  if (!Object.values(ApprovalStatus).includes(approvalStatus)) {
    throw new CustomError(
      "Invalid approval status",
      HttpStatusCode.BAD_REQUEST,
      "Bad request"
    );
  }
};

async function verifyEmailDomain(email: string): Promise<void> {
  const domain = email.split("@")[1];
  if (!domain) {
    throw new CustomError(
      "Invalid email format",
      HttpStatusCode.BAD_REQUEST,
      "email"
    );
  }

  return promises
    .resolveMx(domain)
    .then((addresses: MxRecord[]) => {
      if (!addresses.length) {
        throw new CustomError(
          "Email address not found",
          HttpStatusCode.BAD_REQUEST,
          "email"
        );
      }
    })
    .catch((error) => {
      throw error;
    });
}

const isCloudinaryUrl = (url: string) => url.includes("cloudinary.com");
export {
  verifyEmailDomain,
  validateName,
  validateApprovalStatus,
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
  validateMovieType,
  isCloudinaryUrl,
  validateRole,
};
