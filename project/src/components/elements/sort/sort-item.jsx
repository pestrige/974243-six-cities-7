import React from 'react';
import PropTypes from 'prop-types';
import { SortType } from '../../../const';

export default function SortItem({type, isActive, handleClick}) {
  return (
    <li
      className={`places__option ${isActive ? 'places__option--active' : ''}`}
      tabIndex={0}
      onClick={() => handleClick(SortType[type])}
    >
      {SortType[type].text}
    </li>
  );
}

SortItem.propTypes = {
  type: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
