import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import offersProp from '../offers/offers.prop';
import offerProp from '../card/card.prop';
import { useMap } from '../../hooks/useMap';
import { MapClass } from '../../const';

export default function Map({offers, activeOffer, currentCity, type = MapClass.DEFAULT}) {
  const mapRef = useRef(null);
  useMap(mapRef, offers, activeOffer, currentCity);

  return (
    <section ref={mapRef} className={`${type}__map map`}>
    </section>
  );
}

Map.propTypes = {
  offers: offersProp,
  activeOffer: PropTypes.oneOfType([
    PropTypes.shape({}),
    offerProp,
  ]),
  currentCity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
  }),
  type: PropTypes.string,
};
