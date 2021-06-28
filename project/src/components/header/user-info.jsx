import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function UserInfo({userData}) {
  return (
    <li className="header__nav-item user">
      <Link to={AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile">
        <div
          style={{
            backgroundImage: `url(${userData.avatarUrl})`,
            borderRadius: '10px',
          }}
          className="header__avatar-wrapper user__avatar-wrapper"
        >
        </div>
        <span className="header__user-name user__name">
          {userData.email}
        </span>
      </Link>
    </li>
  );
}

UserInfo.propTypes = {
  userData: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
