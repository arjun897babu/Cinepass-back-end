import express, { Request, Response } from 'express'
import session from 'express-session'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { dependencies } from '../../../config/dependencies/userDependencies'
import { userRoutes } from './user/userRoutes'
import { errorHandler } from './middleware/errorHandler'
import { config } from '../../../config/envConfig'

const app = express();
const origin = config.http.origin;

app.use(cors({
  origin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());


app.use('/users', userRoutes(dependencies));

app.use(errorHandler);
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'The requested URL not found on this server'
  })
})

export default app