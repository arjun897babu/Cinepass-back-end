import slugify from "slugify";
import crypto from 'node:crypto'

function generateRandomId(): string {
  const uniqueId = crypto.randomBytes(8).toString('hex');
  return uniqueId;
}

const createMovieSlug = (movieName: string, id: string): string => {

  const slugifiedMovieName = slugify(movieName, {
    lower: true,
    locale: 'en',
    trim: true
  });

  return `${slugifiedMovieName}-movie-${generateRandomId()}`;
}

const createTheaterSlug = (theaterName: string, city: string): string => {

  const slugifiedTheaterName = slugify(theaterName, {
    lower: true,
    locale: 'en',
    trim: true
  });

  return `${slugifiedTheaterName}-c-${city}`;
}


export { createMovieSlug, createTheaterSlug, generateRandomId };
