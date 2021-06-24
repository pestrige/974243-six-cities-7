import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OffersLoading from '../offers-loading/offers-loading';
import Card from '../card/card';
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

function Offers({
  offers,
  activeOffer = {},
  type = CardType.DEFAULT,
  handleMouseEnter = null,
  isDataLoaded }) {

  return (
    <div className={getClass(type)}>
      {
        !isDataLoaded
          ? <OffersLoading />
          : offers.map((card) => (
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
  isDataLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isDataLoaded: state.isDataLoaded,
});

export { Offers };
export default connect(mapStateToProps, null)(Offers);
