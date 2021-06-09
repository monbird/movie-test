import {
    APPEND_PIECE,
    UPDATE_PIECE,
    REPLACE_PIECE,
    SET_PIECE,
    DELETE_PIECE,
} from '../actions/types';

const initialState = {
    selectedPiece: null,
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
            is_watched: false,
            type: 'movie',
        },
        {
            title: 'The Shawshank Redemption',
            year: '1994',
            runtime: '142 min',
            genre: 'Drama',
            director: 'Frank Darabont',
            cast: 'Tim Robbins, Morgan Freeman, Bob Gunton',
            plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
            language: 'English',
            country: 'USA',
            poster: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
            rating_imdb: '9.3',
            rating_rt: 91,
            imdb_id: 'tt0111161',
            type: 'movie',
            is_watched: false,
        },
        {
            title: 'Parasite',
            year: '2019',
            runtime: '132 min',
            genre: 'Comedy, Drama, Thriller',
            director: 'Bong Joon Ho',
            cast: 'Kang-ho Song, Sun-kyun Lee, Yeo-jeong Cho',
            plot: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
            language: 'Korean, English',
            country: 'South Korea',
            poster: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
            rating_imdb: '8.6',
            rating_rt: 98,
            imdb_id: 'tt6751668',
            type: 'movie',
            is_watched: true,
        },
        {
            title: 'Whiplash',
            year: '2014',
            runtime: '106 min',
            genre: 'Drama, Music',
            director: 'Damien Chazelle',
            cast: 'Miles Teller, J.K. Simmons, Paul Reiser, Melissa Benoist',
            plot: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
            language: 'English',
            country: 'USA',
            poster: 'https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
            rating_imdb: '8.5',
            rating_rt: 94,
            imdb_id: 'tt2582802',
            type: 'movie',
            is_watched: false,
        },
        {
            title: 'My Octopus Teacher',
            year: '2020',
            runtime: '85 min',
            genre: 'Documentary',
            director: 'Pippa Ehrlich, James Reed',
            cast: 'Craig Foster, Tom Foster',
            plot: 'A filmmaker forges an unusual friendship with an octopus living in a South African kelp forest, learning as the animal shares the mysteries of her world.',
            language: 'English',
            country: 'South Africa',
            poster: 'https://m.media-amazon.com/images/M/MV5BZWZlODNlYWUtZjY2Ni00YzdiLTkwNmEtZmY5MmY1MDI0YWQyXkEyXkFqcGdeQXVyNjEwNTM2Mzc@._V1_SX300.jpg',
            rating_imdb: '8.1',
            rating_rt: 97,
            imdb_id: 'tt12888462',
            type: 'movie',
            is_watched: false,
        },
        {
            title: 'Bogowie',
            year: '2014',
            runtime: '120 min',
            genre: 'Biography, Drama',
            director: 'Lukasz Palkowski',
            cast: 'Tomasz Kot, Piotr Glowacki, Szymon Piotr Warszawski',
            plot: "The early career of cardiac surgeon Zbigniew Religa. Despite harsh reality of the 1980s Poland, he successfully leads a team of doctors to the country's first human heart transplantation.",
            language: 'Polish',
            country: 'Poland',
            poster: 'https://m.media-amazon.com/images/M/MV5BMTg2YWRlOTgtYzNiZC00NzgwLTgwNWItYjY2M2NlOWQzY2JlXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_SX300.jpg',
            rating_imdb: '7.7',
            rating_rt: 82,
            imdb_id: 'tt3745620',
            type: 'movie',
            is_watched: true,
        },
        {
            title: "The King's Speech",
            year: '2010',
            runtime: '118 min',
            genre: 'Biography, Drama, History',
            director: 'Tom Hooper',
            cast: 'Colin Firth, Geoffrey Rush, Helena Bonham Carter',
            plot: 'The story of King George VI, his impromptu ascension to the throne of the British Empire in 1936, and the speech therapist who helped the unsure monarch overcome his stammer.',
            language: 'English',
            country: 'United Kingdom, USA',
            poster: 'https://m.media-amazon.com/images/M/MV5BMzU5MjEwMTg2Nl5BMl5BanBnXkFtZTcwNzM3MTYxNA@@._V1_SX300.jpg',
            rating_imdb: '8.0',
            rating_rt: 94,
            imdb_id: 'tt1504320',
            type: 'movie',
            is_watched: false,
        },
        {
            title: 'The Reader',
            year: '2008',
            runtime: '124 min',
            genre: 'Drama, Romance',
            director: 'Stephen Daldry',
            cast: 'Kate Winslet, Ralph Fiennes, Bruno Ganz',
            plot: 'Post-WWII Germany: Nearly a decade after his affair with an older woman came to a mysterious end, law student Michael Berg re-encounters his former lover as she defends herself in a war-crime trial.',
            language: 'English, German, Greek, Latinish',
            country: 'Germany, USA',
            poster: 'https://m.media-amazon.com/images/M/MV5BMTM0NDQxNjA0N15BMl5BanBnXkFtZTcwNDUwMzcwMg@@._V1_SX300.jpg',
            rating_imdb: '7.6',
            rating_rt: 63,
            imdb_id: 'tt0976051',
            type: 'movie',
            is_watched: false,
        },
        {
            title: "One Flew Over the Cuckoo's Nest",
            year: '1975',
            runtime: '133 min',
            genre: 'Drama',
            director: 'Milos Forman',
            cast: 'Jack Nicholson, Louise Fletcher, Michael Berryman',
            plot: 'A criminal pleads insanity and is admitted to a mental institution, where he rebels against the oppressive nurse and rallies up the scared patients.',
            language: 'English',
            country: 'USA',
            poster: 'https://m.media-amazon.com/images/M/MV5BZjA0OWVhOTAtYWQxNi00YzNhLWI4ZjYtNjFjZTEyYjJlNDVlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
            rating_imdb: '8.7',
            rating_rt: 94,
            imdb_id: 'tt0073486',
            type: 'movie',
            is_watched: false,
        },
        {
            title: 'Six Feet Under',
            year: '2001–2005',
            runtime: '55 min',
            genre: 'Comedy, Drama',
            director: 'N/A',
            cast: 'Peter Krause, Michael C. Hall, Frances Conroy',
            plot: 'A chronicle of the lives of a dysfunctional family who run an independent funeral home in Los Angeles.',
            language: 'English',
            country: 'USA',
            poster: 'https://m.media-amazon.com/images/M/MV5BMTQzODk5N2UtYjE4ZC00YWM1LWJkMGYtYmY2NjNjMjIzZDRmXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg',
            rating_imdb: '8.7',
            imdb_id: 'tt0248654',
            type: 'series',
            is_watched: false,
        },
        {
            title: 'Breaking Bad',
            year: '2008–2013',
            runtime: '49 min',
            genre: 'Crime, Drama, Thriller',
            director: 'N/A',
            cast: 'Bryan Cranston, Aaron Paul, Anna Gunn',
            plot: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
            language: 'English, Spanish',
            country: 'USA',
            poster: 'https://m.media-amazon.com/images/M/MV5BMjhiMzgxZTctNDc1Ni00OTIxLTlhMTYtZTA3ZWFkODRkNmE2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
            rating_imdb: '9.4',
            rating_rt: 96,
            imdb_id: 'tt0903747',
            type: 'series',
            is_watched: true,
        },
        {
            title: 'Stranger Things',
            year: '2016-',
            runtime: '51 min',
            genre: 'Drama, Fantasy, Horror',
            director: 'N/A',
            cast: 'Millie Bobby Brown, Finn Wolfhard, Winona Ryder',
            plot: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
            language: 'English, Russian',
            country: 'USA',
            poster: 'https://m.media-amazon.com/images/M/MV5BN2ZmYjg1YmItNWQ4OC00YWM0LWE0ZDktYThjOTZiZjhhN2Q2XkEyXkFqcGdeQXVyNjgxNTQ3Mjk@._V1_SX300.jpg',
            rating_imdb: '8.7',
            imdb_id: 'tt4574334',
            type: 'series',
            is_watched: false,
        },
        {
            title: 'Twin Peaks',
            year: '1990–1991',
            runtime: '47 min',
            genre: 'Crime, Drama, Mystery, Thriller',
            director: 'N/A',
            cast: 'Kyle MacLachlan, Michael Ontkean, Mädchen Amick, Dana Ashbrook',
            plot: 'An idiosyncratic FBI agent investigates the murder of a young woman in the even more idiosyncratic town of Twin Peaks.',
            language: 'English, Icelandic, Afrikaans, Norwegian',
            country: 'USA',
            poster: 'https://m.media-amazon.com/images/M/MV5BMTExNzk2NjcxNTNeQTJeQWpwZ15BbWU4MDcxOTczOTIx._V1_SX300.jpg',
            rating_imdb: '8.8',
            rating_rt: 13,
            imdb_id: 'tt0098936',
            type: 'series',
            is_watched: false,
        },
    ],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PIECE:
            const piece = state.piecesList.filter((piece) => {
                return piece.imdb_id === action.payload.imdb_id;
            })[0];
            return { ...state, selectedPiece: piece };
        case UPDATE_PIECE:
            const updatedPieces = state.piecesList.map((piece) => {
                if (piece.imdb_id === action.payload.imdb_id) {
                    return action.payload;
                } else {
                    return piece;
                }
            });
            return { ...state, piecesList: updatedPieces };
        case REPLACE_PIECE:
            const replacedPieces = state.piecesList.map((piece) => {
                if (piece.imdb_id === action.payload.imdb_id) {
                    return action.payload.body;
                } else {
                    return piece;
                }
            });
            return {
                ...state,
                piecesList: replacedPieces,
                selectedPiece: action.payload.body,
            };
        case DELETE_PIECE:
            const updatedList = state.piecesList.filter((piece) => {
                return piece.imdb_id !== action.payload.imdb_id;
            });
            return { ...state, piecesList: updatedList };
        case APPEND_PIECE:
            return {
                ...state,
                piecesList: [...state.piecesList, action.payload],
            };
        default:
            return state;
    }
};

export default reducer;
