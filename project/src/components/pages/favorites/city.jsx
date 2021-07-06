import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Offers from '../../elements/offers/offers';
import { AppRoute, CardType } from '../../../const';
import PropTypes from 'prop-types';
import offersProp from '../../elements/offers/offers.prop';
import { changeCity } from '../../../store/action';

export default function City({cityName, offers}) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeCity(cityName));
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link to={AppRoute.ROOT} onClick={handleClick} className="locations__item-link">
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <Offers
        offers={offers}
        type={CardType.FAVORITE}
      />
    </li>
  );
}

City.propTypes = {
  cityName: PropTypes.string.isRequired,
  offers: offersProp.isRequired,
};
