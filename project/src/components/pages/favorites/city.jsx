import React from 'react';
import Offers from '../../offers/offers';
import { CardType } from '../../../const';
import PropTypes from 'prop-types';
import offersProp from '../../offers/offers.prop';

export default function City({cityName, offers}) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/#">
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <Offers
        offers={offers}
        type={CardType.FAVORITE}
      />
    </li>
  );
}

City.propTypes = {
  cityName: PropTypes.string.isRequired,
  offers: offersProp.isRequired,
};
