import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../elements/header/header';
import { AppRoute } from '../../../const';
import { login } from '../../../store/api-action';
import cityProp from '../../elements/cities/city.prop';
import authInfoProp from './authInfo.prop';

function Login({ authInfo, city, onSubmit, isError }) {
  const { userData } = authInfo;
  const loginRef = useRef();
  const passwordRef = useRef();

  const email = userData?.email || '';
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
              className={`login__form form ${isError ? 'shake' : ''}`}
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
  authInfo: authInfoProp,
  city: cityProp,
  onSubmit: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
};

const mapPropsToState = (state) => ({
  authInfo: state.authInfo,
  city: state.city,
  isError: state.toast.isShown,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    dispatch(login(authData));
  },
});

export { Login };
export default connect(mapPropsToState, mapDispatchToProps)(Login);
