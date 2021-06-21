import React from 'react';
import Card from '../card/card';
import PropTypes from 'prop-types';
import offersProp from './offers.prop';
import offerProp from '../card/card.prop';
import { CardType } from '../../const';

const getClass = (type) => {
  switch (type) {
    case CardType.FAVORITE:
      return `${type}__places`;
    case CardType.CLOSEST:
      return `${type}__list places__list`;
    default:
      return `${type}__list places__list tabs__content`;
  }
};

export default function Offers({
  offers,
  activeOffer = {},
  type = CardType.DEFAULT,
  handleMouseEnter = null }) {

  return (
    <div className={getClass(type)}>
      {
        offers.map((card) => (
          <Card
            key = {card.id}
            offer = {card}
            cardType={type}
            handleMouseEnter={handleMouseEnter}
            isActive={card.id === activeOffer.id}
          />))
      }
    </div>
  );
}

Offers.propTypes = {
  offers: offersProp.isRequired,
  activeOffer: PropTypes.oneOfType([
    PropTypes.shape({}),
    offerProp,
  ]),
  type: PropTypes.string,
  handleMouseEnter: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
  ]),
};

