import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';

function PrivateRoute({render, exact, path, authorizationStatus}) {
  const isAuth = authorizationStatus === AuthorizationStatus.AUTH;

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => (
        isAuth
          ? render(routeProps)
          : <Redirect to={AppRoute.LOGIN} />
      )}
    />
  );
}

PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = ({authInfo}) => ({
  authorizationStatus: authInfo.status,
});

export { PrivateRoute };
export default connect(mapStateToProps, null)(PrivateRoute);
