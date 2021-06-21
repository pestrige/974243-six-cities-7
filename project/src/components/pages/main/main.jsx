import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../header/header';
import CitiesList from '../../cities-list/cities-list';
import Offers from '../../offers/offers';
import Map from '../../map/map';
import offersProp from '../../offers/offers.prop';
//import { Cities } from '../../../const';
import { filterOffers } from '../../../utils/common';

function Main({offers, cityName}) {
  const [activeOffer, setActiveOffer] = useState({});
  const filteredOffers = filterOffers(offers, cityName);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {filteredOffers.length} places to stay in {cityName}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by </span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <Offers
                offers={filteredOffers}
                activeOffer={activeOffer}
                handleMouseEnter={setActiveOffer}
              />
            </section>
            <div className="cities__right-section">
              <Map
                key={cityName}
                offers={filteredOffers}
                activeOffer={activeOffer}
                cityName={cityName}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

Main.propTypes = {
  offers: offersProp,
  cityName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  cityName: state.cityName,
});

export { Main }; // export for future tests
export default connect(mapStateToProps, null)(Main);


