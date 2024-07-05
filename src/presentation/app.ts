import express,{Request,Response} from 'express'
import session from 'express-session'
import CookieParser from 'cookie-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app  =  express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());

 
export default app