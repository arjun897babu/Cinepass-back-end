import { ICommonDependencies } from "../../application/interface/common/ICommonDependencies";
import * as commonRepositories from '../../infrastructure/database/repositories/common'
import * as commonUsecases from '../../application/applicationUsecases/common'

const commonDependencies: ICommonDependencies = {
  commonRepositories,
  commonUsecases
}

export {
  commonDependencies
}