import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { logout } from '../../store/api-action';

function LogoutLink({onLogout}) {
  return (
    <Link
      to={AppRoute.ROOT}
      className="header__nav-link"
      onClick={() => onLogout()}
    >
      <span className="header__signout">Sign out</span>
    </Link>
  );
}

LogoutLink.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onLogout() {
    dispatch(logout());
  },
});

export { LogoutLink };
export default connect(null, mapDispatchToProps)(LogoutLink);
