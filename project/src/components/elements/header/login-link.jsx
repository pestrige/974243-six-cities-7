import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

export default function LoginLink() {
  return (
    <Link
      to={AppRoute.LOGIN}
      className="header__nav-link"
    >
      <span className="header__login">Sign in</span>
    </Link>
  );
}
