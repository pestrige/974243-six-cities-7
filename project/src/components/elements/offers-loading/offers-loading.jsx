import React from 'react';
import PropTypes from 'prop-types';
import CardLoading from './card-loading';

const LOADING_OFFERS_COUNT = 6;

export default function OffersLoading({offersCount = LOADING_OFFERS_COUNT}) {
  const loadingOffers = new Array(offersCount)
    .fill('')
    .map(() => Math.random());

  return loadingOffers.map((id) => <CardLoading key={id} />);
}

OffersLoading.propTypes = {
  offersCount: PropTypes.number,
};
