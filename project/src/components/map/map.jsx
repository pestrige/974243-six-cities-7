import React, { useRef } from 'react';
import PropTypes from 'prop-types';
//import { connect } from 'react-redux';
import offersProp from '../offers/offers.prop';
import offerProp from '../card/card.prop';
import { useMap } from '../../hooks/useMap';
import { MapClass } from '../../const';

function Map({offers, activeOffer = {}, type = MapClass.DEFAULT, cityName}) {
  const mapRef = useRef(null);

  useMap(mapRef, offers, activeOffer, cityName);

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
  cityName: PropTypes.string.isRequired,
};

// const mapStateToProps = (state) => ({
//   cityName: state.cityName,
// });

export default Map;
//export default connect(mapStateToProps, null)(Map);