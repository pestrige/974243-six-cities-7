import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';

import Main from '../pages/main/main';
import Login from '../pages/login/login';
import Favorites from '../pages/favorites/favorites';
import Offer from '../pages/offer/offer';
import NotFound from '../pages/not-found/not-found';

const CARDS_COUNT = 5;
const cards = new Array(CARDS_COUNT).fill('').map((card) => card = { id: Math.random() }); // временная заглушка

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main
            cards={cards}
          />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <Login isLogin={false} />
        </Route>
        <Route exact path={AppRoute.FAVORITES}>
          <Favorites />
        </Route>
        <Route exact path={`${AppRoute.OFFER}/:id`}>
          <Offer />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
