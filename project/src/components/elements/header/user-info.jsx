import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import userInfoProp from './userInfo.prop';

export default function UserInfo({userData}) {

  return (
    <li className="header__nav-item user">
      <Link to={AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile">
        <div
          data-testid={'userpick'}
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
  userData: userInfoProp,
};
