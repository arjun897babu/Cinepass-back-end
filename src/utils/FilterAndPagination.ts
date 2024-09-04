import { ParsedQs } from 'qs'

const getPageNumber = (query: string | ParsedQs | string[] | ParsedQs[] | undefined): number => {
  if (typeof query !== 'string') return 1
  const page = parseInt(query, 10)

  return page < 1 || isNaN(page) ? 1 : page
}

const getMaxPage = (totalDocument: number, limit: number): number => Math.ceil(totalDocument / limit)



export {
  getPageNumber,
  getMaxPage
}