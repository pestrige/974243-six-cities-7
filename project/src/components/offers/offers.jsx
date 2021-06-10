import React /* { useState } */ from 'react';
import Card from '../card/card';

import offersProp from './offers.prop';

export default function Offers({offers}) {
  // const [activeOfferId, setActiveOffer] = useState(null);
  return (
    offers.map((card) => (
      <Card
        key = {card.id}
        offer = {card}
      />))
  );
}

Offers.propTypes = {
  offers: offersProp,
};
