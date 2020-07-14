import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import Approvals from "../containers/approvals";
import Form from "../containers/form";
import Genres from "../containers/genres";
import Home from "../containers/home";
import Login from "../containers/login"
import Signup from "../containers/signup";
import MusicSession from "../containers/music";

export const routes = {
  login: '/login',
  signup: '/signup',
  addAdmin: '/add/admin',
  home: '/',
  form: '/create/form',
  album: '/profile/info-album',
  playlist: '/profile/info-playlist',
  approvals: '/bands/approvals',
  genres: '/genres',
  musicSession: '/music'
}

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.login} component={Login} />
        <Route exact path={routes.signup} component={Signup} />
        <Route exact path={routes.addAdmin} component={Signup} />
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.form} component={Form} />
        <Route exact path={routes.approvals} component={Approvals} />
        <Route exact path={routes.genres} component={Genres} />
        <Route exact path={routes.music} component={MusicSession} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;