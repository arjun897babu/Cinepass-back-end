import mongoose, { MongooseError } from 'mongoose';
import { config } from './config/config'
import connectDB from './infrastructure/database/connection';
import app from './presentation/app'


const PORT = config.port;

(async()=>{

  try {

    await connectDB();

    app.listen(PORT,()=>{
      console.log(`server is running http://localhost:${PORT}`)
    })
 
  } catch (error) {
    if(error instanceof mongoose.Error) console.log(`failed to connect database ${error.message}`)
    process.exit(1) 
  }

})();  