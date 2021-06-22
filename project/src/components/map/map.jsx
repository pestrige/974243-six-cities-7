import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import offersProp from '../offers/offers.prop';
import offerProp from '../card/card.prop';
import { useMap } from '../../hooks/useMap';
import { MapClass } from '../../const';
import cityProp from '../cities-list/city.prop';

function Map({offers, activeOffer = {}, type = MapClass.DEFAULT, city}) {
  const mapRef = useRef(null);

  useMap(mapRef, offers, activeOffer, city);

  return (
    <section
      className={`${type}__map map`}
      ref={mapRef}
    />
  );
}

Map.propTypes = {
  offers: offersProp,
  activeOffer: PropTypes.oneOfType([
    PropTypes.shape({}),
    offerProp,
  ]),
  type: PropTypes.string,
  city: cityProp,
};

export default Map;
