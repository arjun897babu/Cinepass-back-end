import { ICommonDependencies } from "../../application/interface/common/ICommonDependencies";
import * as commonRepositories from '../../infrastructure/database/repositories/common'
import * as commonUsecases from '../../application/applicationUsecases/common'
import * as userRepositories from '../../infrastructure/database/repositories/user'
import * as adminRepositories from '../../infrastructure/database/repositories/admin'
import * as theaterRepositories from '../../infrastructure/database/repositories/theaters'

const commonDependencies: ICommonDependencies = {
  commonRepositories,
  commonUsecases,
  userRepositories,
  theaterRepositories,
  adminRepositories,
}

export {
  commonDependencies
}