import {
    APPEND_PIECE,
    UPDATE_PIECE,
    REPLACE_PIECE,
    SET_PIECE,
    DELETE_PIECE,
} from './types';

export const appendPiece = (payload) => {
    return {
        type: APPEND_PIECE,
        payload: payload,
    };
};

export const setPiece = (payload) => {
    return {
        type: SET_PIECE,
        payload: payload,
    };
};

export const updatePiece = (payload) => {
    return {
        type: UPDATE_PIECE,
        payload: payload,
    };
};

export const replacePiece = (payload) => {
    return {
        type: REPLACE_PIECE,
        payload: payload,
    };
};

export const deletePiece = (payload) => {
    return {
        type: DELETE_PIECE,
        payload: payload,
    };
};
