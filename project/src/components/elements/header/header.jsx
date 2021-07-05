import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../../const';
import UserInfo from './user-info';
import LoginLink from './login-link';
import LogoutLink from './logout-link';
import Toast from '../toast/toast';
import { getIsAuth, getIsToastShown, getAuthInfo } from '../../../store/selectors';

function Header() {
  const isAuth = useSelector(getIsAuth);
  const isToastShown = useSelector(getIsToastShown);
  const { userData } = useSelector(getAuthInfo);

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
                isAuth && <UserInfo userData={userData}/>
              }
              <li className="header__nav-item">
                { isAuth ? <LogoutLink /> : <LoginLink />}
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {isToastShown && <Toast />}
    </header>
  );
}

export { Header };
export default Header;
