import React from 'react';
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Router from "../Router";
import { generateReducers } from "../../reducers";
import { routerMiddleware } from "connected-react-router";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
  pallete: {
    primary: {
      // light: será calculada com base em palette.primary.main,
      main: '#ff4400',
      // dark: será calculada com base em palette.primary.main,
      // contrastText: será calculada para contrastar com palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: será calculada com base palette.secondary.main,
      contrastText: '#ffcc00',
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
      <MuiThemeProvider theme={theme}>
        <div>
          <Router history={history} />
          'oi'
        </div>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
