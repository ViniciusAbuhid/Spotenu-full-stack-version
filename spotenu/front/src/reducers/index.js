import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { albuns, playLists, genres, music, research, bands, query } from './music'

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    albuns,
    playLists,
    bands,
    genres,
    music,
    research,
    query
  });
