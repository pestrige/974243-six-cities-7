import React from 'react';
import PropTypes from 'prop-types';

export default function Good({good}) {
  return (
    <li className="property__inside-item">
      {good}
    </li>
  );
}

Good.propTypes = {
  good: PropTypes.string,
};
