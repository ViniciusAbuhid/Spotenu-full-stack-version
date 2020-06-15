import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import {albuns} from './albuns'

export const generateReducers = history =>
  combineReducers({
      router: connectRouter(history),
      albuns
  });
