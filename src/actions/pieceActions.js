import { APPEND_PIECE, GET_ONE_PIECE, UPDATE_PIECE, DELETE_PIECE } from './types';

// Append movie/series
export const appendPiece = (payload) => {
    return {
        type: APPEND_PIECE,
        payload: payload,
    };
};

export const getOnePiece = (payload) => {
    return {
        type: GET_ONE_PIECE,
        payload: payload,
    };
};

export const updatePiece = (payload) => {
    return {
        type: UPDATE_PIECE,
        payload: payload,
    };
};

export const deletePiece = (payload) => {
    return {
        type: DELETE_PIECE,
        payload: payload,
    };
};