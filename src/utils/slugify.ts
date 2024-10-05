import slugify from "slugify";
import crypto from 'node:crypto'
import { MovieType } from "./enum";

function generateRandomId(): string {
  const uniqueId = crypto.randomBytes(3).toString('hex');
  return uniqueId;
}

function stringToNumberId(str: string): string {
  const hash = crypto.createHash('sha256').update(str).digest('hex'); 
  const numberId = parseInt(hash.substring(0, 6), 16); 
  return numberId.toString(); 
}
const createMovieSlug = (movieName: string,movieType:MovieType): string => {

  const slugifiedMovieName = slugify(movieName, {
    lower: true,
    locale: 'en',
    trim: true
  });

  return `${slugifiedMovieName}-${movieType===MovieType.STREAM?'STR':'THR'}-${generateRandomId()}`;
}

const createTheaterSlug = (theaterName: string, city: string): string => {

  const slugifiedTheaterName = slugify(theaterName, {
    lower: true,
    locale: 'en',
    trim: true
  });

  return `${slugifiedTheaterName}-c-${city}`;
}


export { createMovieSlug, createTheaterSlug, generateRandomId,stringToNumberId };
