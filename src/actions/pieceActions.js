import { APPEND_PIECE, GET_ALL_PIECES } from './types';

// Append movie/series
export const appendPiece = (payload) => {
    return {
        type: APPEND_PIECE,
        payload: payload,
    };
};

// Return all movies/series
export const getAllPieces = () => {
    return {
        type: GET_ALL_PIECES,
    };
};
