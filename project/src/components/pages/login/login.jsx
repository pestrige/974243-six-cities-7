import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../header/header';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { login } from '../../../store/api-action';
import cityProp from '../../cities/city.prop';
import { getUserDataFromStorage } from '../../../utils/common';

function Login({ authorizationStatus, city, onSubmit }) {
  const loginRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const loginInput = loginRef.current;
    const passwordInput = passwordRef.current;
    if (loginInput) {
      loginInput.value ? passwordInput.focus() : loginInput.focus();
    }
  });

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return <Redirect to={AppRoute.ROOT} />;
  }

  const email = getUserDataFromStorage()?.email || '';
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action=""
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  defaultValue={email}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoute.ROOT} className="locations__item-link">
                <span>
                  {city.name}
                </span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

Login.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  city: cityProp,
  onSubmit: PropTypes.func.isRequired,
};

const mapPropsToState = (state) => ({
  authorizationStatus: state.authorizationStatus,
  city: state.city,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    dispatch(login(authData));
  },
});

export { Login };
export default connect(mapPropsToState, mapDispatchToProps)(Login);
