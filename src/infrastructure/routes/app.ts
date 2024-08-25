import express, { Request, Response } from 'express'
import session from 'express-session'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { userRoutes } from './user/userRoutes'
import { errorHandler } from './middleware/errorHandler'
import { config } from '../../config/envConfig'
import { theaterRoutes } from './theaters/theaterRoutes'
import { theaterDependencies, adminDependencies, dependencies, commonDependencies } from '../../config/dependencies'
import { adminRoutes } from './admin/adminRoutes'
import morgan from 'morgan'

const app = express();
const origin = config.http.origin;

app.use(cors({
  origin,
  methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'],
  credentials: true
}));


// app.use(express.json())
app.use(morgan('tiny'))
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.use('/users', userRoutes(dependencies, commonDependencies));
app.use('/theaters', theaterRoutes(theaterDependencies, commonDependencies));
app.use('/admin', adminRoutes(adminDependencies, commonDependencies));

app.use(errorHandler);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'The requested URL not found on this server'
  })
})

export default app