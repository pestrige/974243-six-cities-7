import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../header/header';
import Empty from './empty';
import CitiesList from '../../cities-list/cities-list';
import Sort from '../../sort/sort';
import Offers from '../../offers/offers';
import Map from '../../map/map';
import { sortOffers } from '../../../utils/common';
import offersProp from '../../offers/offers.prop';
import cityProp from '../../cities-list/city.prop';

function Main({offers, city}) {
  const [activeOffer, setActiveOffer] = useState({});
  const isOffers = offers.length;

  return (
    <div className={`page page--gray page--main ${isOffers ? '' : 'page__main--index-empty'}`}>
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        <div className="cities">
          <div className={`cities__places-container container ${isOffers ? '' : 'cities__places-container--empty'}`}>
            {
              !isOffers
                ? <Empty />
                : (
                  <React.Fragment>
                    <section className="cities__places places">
                      <h2 className="visually-hidden">Places</h2>
                      <b className="places__found">
                        {offers.length} places to stay in {city.name}
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

Main.propTypes = {
  offers: offersProp,
  city: cityProp,
  sortType: PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  city: state.city,
  offers: sortOffers(state.offers, state.city.name, state.sortType.name) ,
});

export { Main }; // export for future tests
export default connect(mapStateToProps, null)(Main);


