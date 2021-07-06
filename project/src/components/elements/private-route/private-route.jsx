import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRoute } from '../../../const';
import { getIsAuth } from '../../../store/selectors';

function PrivateRoute(props) {
  const history = useHistory();
  const isAuth = useSelector(getIsAuth);
  const {render, exact, path, isPrivate = true} = props;

  const getComponent = (routeProps) => {
    if (isPrivate) {
      return isAuth ? render(routeProps) : <Redirect to={AppRoute.LOGIN} />;
    }
    return isAuth ? history.goBack() : render(routeProps);
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
  isPrivate: PropTypes.bool,
};

export { PrivateRoute };
export default PrivateRoute;
