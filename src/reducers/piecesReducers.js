import { APPEND_PIECE, GET_ALL_PIECES } from '../actions/types';

const initialState = {
    piecesList: [
        {
            title: 'The Mask',
            year: '1994',
            runtime: '101 min',
            genre: 'Action, Comedy, Crime, Fantasy',
            director: 'Chuck Russell',
            cast: 'Jim Carrey, Peter Riegert, Peter Greene, Amy Yasbeck',
            plot: 'Bank clerk Stanley Ipkiss is transformed into a manic superhero when he wears a mysterious mask.',
            language: 'English, Swedish',
            country: 'USA',
            poster: 'https://m.media-amazon.com/images/M/MV5BOWExYjI5MzktNTRhNi00Nzg2LThkZmQtYWVkYjRlYWI2MDQ4XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
            rating_imdb: '6.9',
            rating_rt: '79',
            imdb_id: 'tt0110475',
            is_watched: true,
            type: 'movie',
        },
        {
            title: 'Sweet Tooth',
            year: '2017',
            runtime: '17 min',
            genre: 'Short, Horror',
            director: 'Zac Adams, Michael Kenneth Sydenstricker II',
            cast: 'Jessejames Locorriere, Abbi Butler, Nye Reynolds, Michael Berryman',
            plot: 'A gruesome entity attaches itself to an unsuspecting family.',
            language: 'English',
            country: 'USA',
            poster: 'https://m.media-amazon.com/images/M/MV5BNDBkMmUyYjAtMGVkZi00Y2IwLWIzY2ItNGViNjYyZWE0YjcyXkEyXkFqcGdeQXVyMTI3NDE4Ng@@._V1_SX300.jpg',
            rating_imdb: '8.4',
            rating_rt: null,
            imdb_id: 'tt6629078',
            type: 'series',
            is_watched: false,
        },
    ],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PIECES:
            return state.piecesList;
        case APPEND_PIECE:
            return {
                ...state,
                piecesList: [...state.piecesList, action.payload],
            };
        default:
            return state;
    }
}
