import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../header/header';
import CitiesList from '../../cities-list/cities-list';
import Sort from '../../sort/sort';
import Offers from '../../offers/offers';
import Map from '../../map/map';
import offersProp from '../../offers/offers.prop';
import { filterOffers, Sorting } from '../../../utils/common';

function Main({offers, cityName, sortType}) {
  const [activeOffer, setActiveOffer] = useState({});
  const filteredOffers = filterOffers(offers, cityName);
  const sortedOffers = Sorting[sortType.name](filteredOffers);

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
              <Sort key={cityName} />
              <Offers
                offers={sortedOffers}
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
  sortType: PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  cityName: state.cityName,
  sortType: state.sortType,
});

export { Main }; // export for future tests
export default connect(mapStateToProps, null)(Main);


