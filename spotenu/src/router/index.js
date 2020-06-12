import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import Album from "../containers/album";
import Approvals from "../containers/approvals";
import Form from "../containers/form";
import Genres from "../containers/genres";
import Home from "../containers/home";
import Login from "../containers/login";
import NewAdmin from "../containers/newAdmin";
import Playlist from "../containers/playlist";
import Profile from "../containers/profile";
import Signup from "../containers/signup";
import Staff from "../containers/staff";

export const routes = {
    login: '/login',
    signup: '/signup',
    home: '/home',
    profile: '/profile',
    form: '/create/form',
    album: '/profile/info-album',
    playlist: 'profile/info-playlist',
    staff: '/staff',
    approvals: '/staff/approvals',
    newAdmin: '/add/staff',
    genres: '/genres'
}

function Router(props) {
    return (
      <ConnectedRouter history={props.history}>
        <Switch>
          <Route exact path={routes.login} component={Login} />
          <Route exact path={routes.signup} component={Signup}/>
          <Route exact path={routes.home} component={Home}/>
          <Route exact path={routes.profile} component={Profile}/>
          <Route exact path={routes.form} component={Form}/>
          <Route exact path={routes.album} component={Album}/>
          <Route exact path={routes.playlist} component={Playlist}/>
          <Route exact path={routes.staff} component={Staff}/>
          <Route exact path={routes.approvals} component={Approvals}/>
          <Route exact path={routes.newAdmin} component={NewAdmin}/>
          <Route exact path={routes.genres} component={Genres}/>
        </Switch>
      </ConnectedRouter>
    );
  }
  
  export default Router;