import { ParsedQs } from 'qs'
import { MovieFilter } from './interface';
import { Formats, Genres, Languages, MovieFilterEnum } from './enum';
type IQueryParam = string | ParsedQs | string[] | ParsedQs[] | undefined;

const getPageNumber = (query: IQueryParam): number => {
  if (typeof query !== 'string') return 1
  const page = parseInt(query, 10)

  return page < 1 || isNaN(page) ? 1 : page
}

const getMaxPage = (totalDocument: number, limit: number): number => Math.ceil(totalDocument / limit)

const calculateSkip = (pageNumber: number, limit: number): number => (pageNumber - 1) * limit
function isIsoDate(date:string) {
  return  /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(date)
}
const toValidJSDate = (query: IQueryParam): Date => {
  if (typeof query !== 'string') return new Date()

  if(isIsoDate(query)) return new Date(query)
   
  if (query.split('-').length == 3) {
    const [day, month, year] = query.split('-');
    const date = new Date(`${year}-${month}-${day}`);
    const currentDate = new Date();
    if (date < currentDate) {
      return currentDate;
    } else {
      return date;
    }
  } else {
    return new Date()
  }
}
const isValidEnumValue = (query: string, enumValues: string[]): string => !enumValues.includes(query) ? '' : query


const validateFilterQueryString = (query: IQueryParam, filterType: MovieFilterEnum): string => {
  if (typeof query !== 'string') return ''
  const filterString: Record<MovieFilterEnum, string[]> = {
    [MovieFilterEnum.FORMAT]: Object.values(Formats),
    [MovieFilterEnum.GENRE]: Object.values(Genres),
    [MovieFilterEnum.LANGUAGE]: Object.values(Languages),
    [MovieFilterEnum.SEARCH]: [...Object.values(Formats), ...Object.values(Genres), ...Object.values(Languages)],
    [MovieFilterEnum.NOW_SHOWING]: []
  };
  if (filterType in filterString && filterType !== MovieFilterEnum.NOW_SHOWING) {
    return isValidEnumValue(query, filterString[filterType]);
  }
  return ''
}

const validateNowShowingFilter = (query: IQueryParam): boolean => {
  if (query === 'true') {
    return true;
  } else if (query === 'false') {
    return false;
  }
  return true
}


export {
  validateFilterQueryString,
  validateNowShowingFilter,
   getPageNumber,
  getMaxPage,
  calculateSkip,
  toValidJSDate
}