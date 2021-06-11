import React, { useState } from 'react';
import Card from '../card/card';

import offersProp from './offers.prop';

export default function Offers({offers}) {
  const [activeOffer, setActiveOffer] = useState(null);
  const handleMouseEnter = (offer) => {
    setActiveOffer(offer);
  };
  // eslint-disable-next-line no-console
  console.log(activeOffer);

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((card) => (
          <Card
            key = {card.id}
            offer = {card}
            handleMouseEnter={handleMouseEnter}
          />))
      }
    </div>
  );
}

Offers.propTypes = {
  offers: offersProp,
};
