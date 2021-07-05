import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { logout } from '../../../store/api-action';

function LogoutLink() {
  const dispatch = useDispatch();

  return (
    <Link
      to={AppRoute.ROOT}
      className="header__nav-link"
      onClick={() => dispatch(logout())}
    >
      <span className="header__signout">Sign out</span>
    </Link>
  );
}

export { LogoutLink };
export default LogoutLink;
