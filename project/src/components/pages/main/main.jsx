import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../elements/header/header';
import EmptyMain from './empty-main';
import Cities from '../../elements/cities/cities';
import Sort from '../../elements/sort/sort';
import Offers from '../../elements/offers/offers';
import Map from '../../elements/map/map';

import { getOffers, getActiveCity, getIsOffersLoaded } from '../../../store/selectors';
import { sort } from '../../../store/action';
import { SortType } from '../../../const';

export default function Main() {
  const offers = useSelector(getOffers);
  const city = useSelector(getActiveCity);
  const isDataLoaded = useSelector(getIsOffersLoaded);
  const dispatch = useDispatch();

  useEffect(() => dispatch(sort(SortType.DEFAULT)), [dispatch]);

  const [activeOffer, setActiveOffer] = useState({});
  const isOffers = offers.length;

  return (
    <div data-testid={'main-page'} className={`page page--gray page--main ${isOffers ? '' : 'page__main--index-empty'}`}>
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Cities />
        </div>
        <div className="cities">
          <div data-testid={'places-container'} className={`cities__places-container container ${isOffers ? '' : 'cities__places-container--empty'}`}>
            {
              !isOffers && isDataLoaded
                ? <EmptyMain cityName={city.name}/>
                : (
                  <React.Fragment>
                    <section className="cities__places places">
                      <h2 className="visually-hidden">Places</h2>
                      <b className="places__found">
                        {
                          isDataLoaded
                            ? `${offers.length} places to stay in ${city.name}`
                            : 'Places are loading ...'
                        }
                      </b>
                      <Sort key={city.name} />
                      <Offers
                        offers={offers}
                        activeOffer={activeOffer}
                        handleMouseEnter={setActiveOffer}
                      />
                    </section>
                    <div className="cities__right-section">
                      <Map
                        key={city.name}
                        offers={offers}
                        activeOffer={activeOffer}
                        city={city}
                      />
                    </div>
                  </React.Fragment>
                )
            }
          </div>
        </div>
      </main>
    </div>
  );
}
