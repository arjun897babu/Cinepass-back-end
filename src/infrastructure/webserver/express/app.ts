import express,{Request,Response} from 'express'
import session from 'express-session'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { dependencies } from '../../../config/UserDependencies'
import { userRoutes } from './user/userRoutes'

const app  =  express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());


app.use('/users',userRoutes(dependencies))
 
export default app