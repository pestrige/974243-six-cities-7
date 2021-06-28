import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import UserInfo from './user-info';
import LoginLink from './login-link';
import LogoutLink from './logout-link';
import authInfoProp from '../pages/login/authInfo.prop';

function Header({ authInfo }) {
  const { status, userData} = authInfo;
  const isLogin = status === AuthorizationStatus.AUTH;

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
                isLogin && <UserInfo userData={userData}/>
              }
              <li className="header__nav-item">
                { isLogin ? <LogoutLink /> : <LoginLink />}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  authInfo: authInfoProp,
};

const mapStateToProps = (state) => ({
  authInfo: state.authInfo,
});

export { Header };
export default connect(mapStateToProps)(Header);
