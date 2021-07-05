import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppRoute } from '../../../const';

export default function City({isActive, name, onChange}) {
  return (
    <li className="locations__item">
      <Link
        className={`${isActive ? 'tabs__item--active' : ''} locations__item-link tabs__item`}
        to={AppRoute.ROOT}
        onClick={() => onChange(name)}
      >
        <span>{name}</span>
      </Link>
    </li>
  );
}

City.propTypes = {
  isActive: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
