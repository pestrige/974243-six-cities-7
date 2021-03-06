import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';

import Main from '../pages/main/main';
import Login from '../pages/login/login';
import Favorites from '../pages/favorites/favorites';
import Offer from '../pages/offer/offer';
import NotFound from '../pages/not-found/not-found';
import PrivateRoute from '../elements/private-route/private-route';

export default function App() {
  return (
    <Switch>
      <Route exact path={AppRoute.ROOT}>
        <Main />
      </Route>
      <PrivateRoute
        exact
        path={AppRoute.LOGIN}
        render={() => <Login />}
        isPrivate={false}
      />
      <PrivateRoute
        exact
        path={AppRoute.FAVORITES}
        render={() => <Favorites />}
      />
      <Route
        exact path={`${AppRoute.OFFER}/:id`}
        render={({match}) => <Offer id={+match.params.id} />}
      />
      <Route path={AppRoute.NOT_FOUND}>
        <NotFound />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
