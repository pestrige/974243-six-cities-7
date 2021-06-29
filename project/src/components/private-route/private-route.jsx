import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';

function PrivateRoute({render, exact, path, authorizationStatus, isPrivate = true}) {
  const isAuth = authorizationStatus === AuthorizationStatus.AUTH;

  const getComponent = (routeProps) => {
    if (isPrivate) {
      return isAuth ? render(routeProps) : <Redirect to={AppRoute.LOGIN} />;
    }
    return isAuth ? <Redirect to={AppRoute.ROOT} /> : render(routeProps);
  };

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => getComponent(routeProps)}
    />
  );
}

PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool,
};

const mapStateToProps = ({authInfo}) => ({
  authorizationStatus: authInfo.status,
});

export { PrivateRoute };
export default connect(mapStateToProps, null)(PrivateRoute);
