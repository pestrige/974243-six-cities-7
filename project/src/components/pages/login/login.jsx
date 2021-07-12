import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../elements/header/header';
import { AppRoute } from '../../../const';
import { login } from '../../../store/api-action';
import { getActiveCity, getAuthInfo, getIsToastShown } from '../../../store/selectors';

export default function Login() {
  const { userData } = useSelector(getAuthInfo);
  const city = useSelector(getActiveCity);
  const isError = useSelector(getIsToastShown);
  const dispatch = useDispatch();

  const loginRef = useRef();
  const passwordRef = useRef();

  const email = userData?.email || '';
  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(login({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    }));
  };

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title" data-testid="login-title">Sign in</h1>
            <form
              className={`login__form form ${isError ? 'shake' : ''}`}
              action=""
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="email">E-mail</label>
                <input
                  ref={loginRef}
                  defaultValue={email}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  id="email"
                  data-testid="login"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="password">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  id="password"
                  data-testid="password"
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                data-testid="login-button"
              >
                Sign in
              </button>
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
