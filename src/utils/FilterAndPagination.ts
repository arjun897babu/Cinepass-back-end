import { ParsedQs } from 'qs'
import { MovieFilter } from './interface';
import { Formats, Genres, Languages, MovieFilterEnum, Period } from './enum';
import moment from 'moment';
type IQueryParam = string | ParsedQs | string[] | ParsedQs[] | undefined;

const getPageNumber = (query: IQueryParam): number => {
  if (typeof query !== 'string') return 1
  const page = parseInt(query, 10)

  return page < 1 || isNaN(page) ? 1 : page
}

function convertBoolean(query: IQueryParam): boolean {
  if (typeof query !== 'string') {
    return false
  }
  else {
    return true
  }
}

const getMaxPage = (totalDocument: number, limit: number): number => Math.ceil(totalDocument / limit)

const calculateSkip = (pageNumber: number, limit: number): number => (pageNumber - 1) * limit
function isIsoDate(date: string) {
  return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(date)
}
const toValidJSDate = (query: IQueryParam): Date => {
  if (typeof query !== 'string') return new Date()

  if (isIsoDate(query)) return new Date(query)

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

function generateMovieFilterConditions(filter?: Partial<MovieFilter>) {
  const conditions = [];

  if (filter?.format && filter.format !== '') {
    conditions.push({
      $in: [filter.format, '$$runningMovies.format']
    });
  }

  if (filter?.genre && filter.genre !== '') {
    conditions.push({
      $in: [filter.genre, '$$runningMovies.genres']
    });
  }

  if (filter?.language && filter.language !== '') {
    conditions.push({
      $in: [filter.language, '$$runningMovies.languages']
    });
  }


  return conditions.length > 0 ? conditions : [true];
}

function validatePeriod(query: IQueryParam): Period {
  if (typeof query !== 'string') return Period.WEEK

  return Object.values(Period).includes(query as Period) ? query as Period : Period.WEEK
}

function generateRevenueFilterDate(period: Period) {
  const today = moment()

  let matchDate;
  // const weekStart = today.clone().startOf('week').add(1, 'day').utc().startOf('day')
  const weekStart = today.clone().startOf('week').utc().startOf('day')
  const weekEnd = today.clone().endOf('week').utc().endOf('day')



  const monthStart = today.clone().startOf('month').utc().startOf('day')
  const monthEnd = today.clone().endOf('month').utc().endOf('day')
  const yearStart = today.clone().startOf('year').utc().endOf('day')
  const yearEnd = today.clone().endOf('year').utc().endOf('day')

  if (period === 'week') {
    matchDate = { $gte: weekStart.toDate(), $lte: weekEnd.toDate() };
  } else if (period === 'month') {
    matchDate = { $gte: monthStart.toDate(), $lte: monthEnd.toDate() };
  } else if (period === 'year') {
    matchDate = { $gte: yearStart.toDate(), $lte: yearEnd.toDate() };
  }
  return matchDate;

}


export {
  generateRevenueFilterDate,
  convertBoolean,
  generateMovieFilterConditions,
  validateFilterQueryString,
  validateNowShowingFilter,
  getPageNumber,
  getMaxPage,
  calculateSkip,
  toValidJSDate,
  validatePeriod
}