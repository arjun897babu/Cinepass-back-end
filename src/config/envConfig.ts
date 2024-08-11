import 'dotenv/config'
import dotenv from 'dotenv'
import { envString, envNumber } from '../utils/envUtils'

dotenv.config();

export const config = {
  http: {
    host: envString('HOST', 'localhost'),
    port: envNumber('PORT', 8080),
    origin: envString('ORIGIN')
  },
  mongo: {
    mongoURI: envString('MONGO_URI')
  },
  secrets: {
    access_token: envString('JWT_ACCESS_SECRET'),
    refresh_token: envString('JWT_REFRESH_SECRET'),
    short_lived_access_token: envString('JWT_SHORT_LIVED_ACCESS_SECRET')
  },
  app: {
    email: envString('CINEPASS_AUTH_EMAIL'),
    password: envString('CINEPASS_AUTH_PASSWORD')
  },
  google: {
    client_id: envString('CLIENT_ID')
  },
  cloudinary: {
    cloud_api: envString('CLOUDINARY_API'),
    cloud_secret: envString('CLOUDINARY_SECRET'),
    cloud_name: envString('CLOUDINARY_CLOUD_NAME'),
    cloud_preset: envString('CLOUDINARY_PRESET'),
  }
} 
