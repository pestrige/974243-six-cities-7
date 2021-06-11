import React from 'react';
import Header from '../../header/header';
import City from './city';
import Empty from './empty';
import offersProp from '../../offers/offers.prop';

const createOffersMap = (offers) => {
  const offersMap = new Map();
  offers.forEach((offer) => {
    const cityName = offer.city.name;
    const value = (offersMap.get(cityName) || []);
    value.push(offer);
    offersMap.set(cityName, value);
  });
  return [...offersMap.entries()];
};

export default function Favorites({ offers = [] }) {
  const favoritesOffers = offers.filter((offer) => offer.isFavorite);
  const isEmpty = favoritesOffers.length === 0;
  const offersMap = createOffersMap(favoritesOffers);

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
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </a>
      </footer>
    </div>
  );
}

Favorites.propTypes = {
  offers: offersProp,
};
