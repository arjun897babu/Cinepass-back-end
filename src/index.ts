import mongoose, { MongooseError } from 'mongoose';
import { config } from './config/envConfig'
import connectDB from './infrastructure/database/connection';
import app from './infrastructure/webserver/app'


const PORT = config.http.port;
const HOST = config.http.host;

(async()=>{

  try {

    await connectDB();
     
    app.listen(PORT,()=>{
      console.log(`server is running http://${HOST}:${PORT}`)
    })
 
  } catch (error) {
    if(error instanceof mongoose.Error) console.log(`failed to connect database ${error.message}`)
    process.exit(1) 
  }

})();  