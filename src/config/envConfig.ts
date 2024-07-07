import 'dotenv/config'
import dotenv from 'dotenv'
import { envString, envNumber } from '../utils/envUtils'

dotenv.config();

export const config = {
  http: {
    host: envString( 'HOST', 'localhost'),
    port: envNumber('PORT',8080),
  },
  mongo: {
    mongoURI: envString('MONGO_URI')
  },
  secrets: {
    access_token:envString('JWT_ACCESS_SECRET'),
    refresh_token:envString('JWT_REFRESH_SECRET'),
    short_lived_access_token:envString('JWT_SHORT_LIVED_ACCESS_SECRET') 
  },
  app:{
    email:envString('CINEPASS_AUTH_EMAIL'),
    password:envString('CINEPASS_AUTH_PASSWORD')
  }
} 
