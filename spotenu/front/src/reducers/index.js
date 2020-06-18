import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { albuns, playLists, genres } from './music'
import { bands } from './bands'

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    albuns,
    playLists,
    bands,
    genres
  });
