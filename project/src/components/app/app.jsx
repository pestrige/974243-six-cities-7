import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import browserHistory from '../../browser-histiry';

import Main from '../pages/main/main';
import Login from '../pages/login/login';
import Favorites from '../pages/favorites/favorites';
import Offer from '../pages/offer/offer';
import NotFound from '../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';

export default function App() {
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <Login />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() => <Favorites />}
        />
        <Route
          exact path={`${AppRoute.OFFER}/:id`}
          render={({match}) => <Offer id={+match.params.id} />}
        />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
