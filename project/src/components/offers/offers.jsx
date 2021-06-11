import React /* { useState } */ from 'react';
import Card from '../card/card';

import offersProp from './offers.prop';

export default function Offers({offers}) {
  // const [activeOfferId, setActiveOffer] = useState(null);
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((card) => (
          <Card
            key = {card.id}
            offer = {card}
          />))
      }
    </div>
  );
}

Offers.propTypes = {
  offers: offersProp,
};
