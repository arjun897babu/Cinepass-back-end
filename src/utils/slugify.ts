import slugify from "slugify";

const createSlug = (movieName: string, id: string): string => {

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

export { createSlug };
