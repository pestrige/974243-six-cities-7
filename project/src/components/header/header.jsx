import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logout } from '../../store/api-action';
import authInfoProp from '../pages/login/authInfo.prop';

function Header({ authInfo, toLogout }) {
  const { status, userData} = authInfo;
  const loginRef = useRef();
  const isLogin = status === AuthorizationStatus.AUTH;
  const handleClick = () => {
    loginRef.current.blur();
    if (isLogin) {
      toLogout();
    }
  };

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
              }
              <li className="header__nav-item">
                <Link
                  ref={loginRef}
                  to={isLogin ? AppRoute.ROOT : AppRoute.LOGIN}
                  onClick={handleClick}
                  className="header__nav-link"
                >
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
  authInfo: authInfoProp,
  toLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authInfo: state.authInfo,
});

const mapDispatchToProps = (dispatch) => ({
  toLogout() {
    dispatch(logout());
  },
});

export { Header };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
