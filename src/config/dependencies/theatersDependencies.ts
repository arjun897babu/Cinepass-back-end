
import { ITheaterDependencies } from '../../application/interface/theaters/ITheaterDependencies'
import * as theaterUseCase from '../../application/applicationUsecases/theaters'
import * as theaterRepositories from '../../infrastructure/database/repositories/theaters'

const theaterDependencies:ITheaterDependencies = {
  theaterRepositories,
  theaterUseCase
}

export {
  theaterDependencies
}