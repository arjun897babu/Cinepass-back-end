import slugify from "slugify";

const createMovieSlug = (movieName: string, id: string): string => {

  const slugifiedMovieName = slugify(movieName, {
    lower: true,
    locale: 'en',
    trim: true
  });

  const slugifiedId = slugify(id, {
    lower: true,
    locale: 'en',
    trim: true,
    remove: /[a-zA-Z]/g
  });

  return `${slugifiedMovieName}-movie-${slugifiedId}`;
}

const createTheaterSlug = (theaterName: string, city: string): string => {

  const slugifiedTheaterName = slugify(theaterName, {
    lower: true,
    locale: 'en',
    trim: true
  });

  return `${slugifiedTheaterName}-c-${city}`;
}

export { createMovieSlug ,createTheaterSlug};
