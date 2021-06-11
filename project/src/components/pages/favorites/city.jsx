import React from 'react';
import Card from '../../card/card';
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
      <div className="favorites__places">
        {
          offers.map((offer) => (
            <Card
              key={offer.id}
              offer={offer}
              cardType={CardType.FAVORITE}
            />
          ))
        }
      </div>
    </li>
  );
}

City.propTypes = {
  cityName: PropTypes.string.isRequired,
  offers: offersProp,
};
