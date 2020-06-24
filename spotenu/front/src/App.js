import React from 'react';
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Router from "./router/index";
import { generateReducers } from "../src/reducers/index";
import { routerMiddleware } from "connected-react-router";
import { createMuiTheme, ThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: 
    {
      main: '#FE7E02'
    },
    secondary: {
      main: '#0063a5'
    }
  }
})

export const history = createBrowserHistory();

const middlewares = [
  applyMiddleware(routerMiddleware(history), thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
];

const store = createStore(generateReducers(history), compose(...middlewares));

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <Router history={history} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
