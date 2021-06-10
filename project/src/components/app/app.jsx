import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import offersProp from '../offers/offers.prop';

import Main from '../pages/main/main';
import Login from '../pages/login/login';
import Favorites from '../pages/favorites/favorites';
import Offer from '../pages/offer/offer';
import NotFound from '../pages/not-found/not-found';

export default function App({offers}) {
  // eslint-disable-next-line no-console
  console.log(offers);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main
            offers={offers}
          />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <Login isLogin={false} />
        </Route>
        <Route exact path={AppRoute.FAVORITES}>
          <Favorites />
        </Route>
        <Route exact path={`${AppRoute.OFFER}/:id`}>
          <Offer offers={offers} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  offers: offersProp,
};
