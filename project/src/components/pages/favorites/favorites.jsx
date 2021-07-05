import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../../elements/header/header';
import City from './city';
import Empty from './empty';
import { AppRoute } from '../../../const';
import { getFavoriteOffers, getFavOffersMap } from '../../../store/selectors';

function Favorites() {
  const favoritesOffers = useSelector(getFavoriteOffers);
  const offersMap = useSelector(getFavOffersMap);
  const isEmpty = favoritesOffers.length === 0;

  return (
    <div className="page">
      <Header />
      <main className={`${isEmpty && 'page__main--favorites-empty'} page__main page__main--favorites`}>
        <div className="page__favorites-container container">
          {
            isEmpty
              ? <Empty />
              : (
                <section className="favorites">
                  <h1 className="favorites__title">Saved listing</h1>
                  <ul className="favorites__list">
                    {
                      offersMap.map(([cityName, favOffers]) => (
                        <City
                          key={cityName}
                          cityName={cityName}
                          offers={favOffers}
                        />
                      ))
                    }
                  </ul>
                </section>
              )
          }
        </div>
      </main>
      <footer className="footer container">
        <Link to={AppRoute.ROOT} className="footer__logo-link">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </Link>
      </footer>
    </div>
  );
}

export { Favorites };
export default Favorites;
