import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { logout } from '../../../store/api-action';


export default function LogoutLink() {
  const dispatch = useDispatch();
  const onClick = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <Link
      to={AppRoute.ROOT}
      className="header__nav-link"
      onClick={onClick}
    >
      <span className="header__signout">Sign out</span>
    </Link>
  );
}
