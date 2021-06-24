import React from 'react';
import CardLoading from './card-loading';

const LOADING_OFFERS_COUNT = 6;
const LOADING_OFFERS = new Array(LOADING_OFFERS_COUNT).fill('');

export default function OffersLoading() {
  return LOADING_OFFERS.map(() => <CardLoading key={Math.random()} />);
}
