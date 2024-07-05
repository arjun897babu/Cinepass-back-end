import 'dotenv/config'
import dotenv from 'dotenv'

dotenv.config();

export const config = {
  port: process.env.PORT as string,
  jwtSecret: process.env.JWT_SECRET as string,
  mongoURI: process.env.MONGO_URI as string
}  