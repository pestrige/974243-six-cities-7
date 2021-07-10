import React from 'react';
import PropTypes from 'prop-types';

export default function EmptyMain({cityName}) {
  return (
    <React.Fragment>
      <section data-testid={'cities-empty-container'} className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">
            We could not find any property available at the moment in {cityName}
          </p>
        </div>
      </section>
      <div className="cities__right-section" />
    </React.Fragment>
  );
}

EmptyMain.propTypes = {
  cityName: PropTypes.string.isRequired,
};
