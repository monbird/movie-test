const transformOmdbFilm = (film) => {
    return {
        title: film.Title,
        genre: film.Genre,
        country: film.Country,
        year: film.Year,
        runtime: film.Runtime,
        language: film.Language,
        cast: film.Actors,
        director: film.Director,
        is_watched: false,
        imdb_id: film.imdbID,
        rating_imdb: film.imdbRating,
        rating_rt: film.Ratings[1]?.Value,
        poster: film.Poster,
        plot: film.Plot,
        type: film.type,
    };
};

export { transformOmdbFilm };
