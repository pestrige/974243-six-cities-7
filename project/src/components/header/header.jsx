import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function Header({ isLogin = true }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <NavLink exact to={AppRoute.ROOT} className="header__logo-link" activeClassName="header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
            </NavLink>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                isLogin &&
                  <li className="header__nav-item user">
                    <Link to={AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </Link>
                  </li>
              }
              <li className="header__nav-item">
                <Link to={AppRoute.LOGIN} className="header__nav-link">
                  <span className="header__signout">Sign {isLogin ? 'out' : 'in'}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  isLogin: PropTypes.bool,
};
