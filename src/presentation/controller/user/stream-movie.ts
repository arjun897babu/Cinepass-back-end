import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { getPageNumber } from "../../../utils/FilterAndPagination";
import { HttpStatusCode } from "../../../utils/enum";

const getStreamMovies = (dependencies: IDependencies) => {
  const { useCases: { streamMovies } } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log('reaching in get stream movie controller')
    const { _id, roles, movieId, publicId } = req.params
    const pageNumber = getPageNumber(req.query.pageNumber)
    try {
      const response = await streamMovies(dependencies).execute({ filter: { pageNumber }, _id, movieId, publicId })

      return res.status(HttpStatusCode.OK).json({
        status: response.status,
        message: response.message,
        data: response.data
      })
    } catch (error) {
      next(error)
    }
  }

}

 

export {
  getStreamMovies,
 

}