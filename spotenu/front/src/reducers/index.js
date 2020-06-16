import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { albuns } from './albuns'
import { bands } from './bands'

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    albuns,
    bands
  });
