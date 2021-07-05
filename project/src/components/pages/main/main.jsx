import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../elements/header/header';
import Empty from './empty';
import Cities from '../../elements/cities/cities';
import Sort from '../../elements/sort/sort';
import Offers from '../../elements/offers/offers';
import Map from '../../elements/map/map';
import { sortOffers } from '../../../utils/common';
import offersProp from '../../elements/offers/offers.prop';
import cityProp from '../../elements/cities/city.prop';

function Main({offers, city, isDataLoaded}) {
  const [activeOffer, setActiveOffer] = useState({});
  const isOffers = offers.length;

  return (
    <div className={`page page--gray page--main ${isOffers ? '' : 'page__main--index-empty'}`}>
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Cities />
        </div>
        <div className="cities">
          <div className={`cities__places-container container ${isOffers ? '' : 'cities__places-container--empty'}`}>
            {
              !isOffers && isDataLoaded
                ? <Empty />
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

Main.propTypes = {
  offers: offersProp,
  city: cityProp,
  sortType: PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  isDataLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  offers: sortOffers(state.offers, state.city.name, state.sortType.name) ,
  isDataLoaded: state.isDataLoaded.offers,
});

export { Main }; // export for future tests
export default connect(mapStateToProps, null)(Main);


