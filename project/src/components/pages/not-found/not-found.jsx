import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../../const';
import Header from '../../elements/header/header';
import { clearError } from '../../../store/action';

export default function NotFound () {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => dispatch(clearError()), [pathname, dispatch]);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Page not found</h1>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">Oops!</b>
                <p className="cities__status-description">
                  Sorry, the page you were looking for could not be found.
                </p>
                <Link to={AppRoute.ROOT} className="locations__item-link locations__item-link--small tabs__item tabs__item--active">
                  <span>Home page</span>
                </Link>
              </div>
            </section>
            <div className="cities__right-section" />
          </div>
        </div>
      </main>
    </div>
  );
}
