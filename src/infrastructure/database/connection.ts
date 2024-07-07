import mongoose from 'mongoose'
import { config } from '../../config/envConfig'

const MONGO_URI = config.mongo.mongoURI;

const connectDB = async (): Promise<void> => {
  try {

    const con = await mongoose.connect(MONGO_URI);

    console.log(`Mongodb connected  successfully on : ${con.connection.host}`)

  } catch (error) {
    throw error
  }
}

export default connectDB
