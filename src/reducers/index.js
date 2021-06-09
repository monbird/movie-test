import { combineReducers } from "redux";
import piecesReducers from "./piecesReducers";

const rootReducer = combineReducers({
    pieces: piecesReducers,
});

export default rootReducer;
