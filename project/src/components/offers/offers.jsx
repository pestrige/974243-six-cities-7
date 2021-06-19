import React from 'react';
import Card from '../card/card';
import PropTypes from 'prop-types';
import offersProp from './offers.prop';
import offerProp from '../card/card.prop';

export default function Offers({offers, activeOffer, handleMouseEnter}) {

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((card) => (
          <Card
            key = {card.id}
            offer = {card}
            handleMouseEnter={handleMouseEnter}
            isActive={card.id === activeOffer.id}
          />))
      }
    </div>
  );
}

Offers.propTypes = {
  offers: offersProp,
  activeOffer: PropTypes.oneOfType([
    PropTypes.shape({}),
    offerProp,
  ]),
  handleMouseEnter: PropTypes.func,
};
