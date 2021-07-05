import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../../const';
import Header from '../../elements/header/header';
import { ActionCreator } from '../../../store/action';

function NotFound ({onClearError}) {
  const { pathname } = useLocation();
  useEffect(() => onClearError(), [pathname, onClearError]);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Page not found</h1>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">Oops!</b>
                <p className="cities__status-description">
                  Sorry, the page you were looking for could not be found.
                </p>
                <Link to={AppRoute.ROOT} className="locations__item-link locations__item-link--small tabs__item tabs__item--active">
                  <span>Home page</span>
                </Link>
              </div>
            </section>
            <div className="cities__right-section" />
          </div>
        </div>
      </main>
    </div>
  );
}

NotFound.propTypes = {
  onClearError: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onClearError() {
    dispatch(ActionCreator.clearError());
  },
});

export { NotFound };
export default connect(null, mapDispatchToProps)(NotFound);
