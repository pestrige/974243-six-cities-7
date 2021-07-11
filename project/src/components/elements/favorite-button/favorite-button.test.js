import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import FavoriteButton from './favorite-button';

export const FavoriteButtonType = {
  OFFER: {
    name: 'property',
    width: 31,
    height: 33,
  },
};
const mockStore = configureStore();
const history = createMemoryHistory();
jest.mock('../../../store/api-action', () => ({
  __esModule: true,
  switchFavorite() {
    return 'updated store data after async action';
  },
}));

describe('Component FavoriteButton', () => {
  it('should render correctly with default values', () => {
    const type = {name: 'place-card', width: 18, height: 19};
    const storeFakeData = {
      AUTH: {status: 'NO_AUTH'},
      FORM: {isSending: false},
    };

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <FavoriteButton
            id={1}
            isFavorite={false}
            type={type}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button')).toHaveClass(`${type.name}__bookmark-button button`);
    expect(screen.getByRole('button')).not.toBeDisabled();
    expect(screen.getByTestId('favorite-button-1')).toHaveAttribute('width', `${type.width}`);
    expect(screen.getByTestId('favorite-button-1')).toHaveAttribute('height', `${type.height}`);
  });

  it('should render correctly if component has offer type', () => {
    const type = {name: 'property', width: 31, height: 33};
    const storeFakeData = {
      AUTH: {status: 'NO_AUTH'},
      FORM: {isSending: false},
    };

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <FavoriteButton
            id={1}
            isFavorite={false}
            type={type}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button')).toHaveClass(`${type.name}__bookmark-button button`);
    expect(screen.getByTestId('favorite-button-1')).toHaveAttribute('width', `${type.width}`);
    expect(screen.getByTestId('favorite-button-1')).toHaveAttribute('height', `${type.height}`);
  });

  it('should render correctly with isFavorite and isSending flags', () => {
    const type = {name: 'place-card', width: 18, height: 19};
    const storeFakeData = {
      AUTH: {status: 'NO_AUTH'},
      FORM: {isSending: true},
    };

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <FavoriteButton
            id={1}
            isFavorite
            type={type}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button')).toHaveClass(`${type.name}__bookmark-button--active ${type.name}__bookmark-button button`);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should redirect to /login when click with no authorization', () => {
    const type = {name: 'place-card', width: 18, height: 19};
    const storeFakeData = {
      AUTH: {status: 'NO_AUTH'},
      FORM: {isSending: false},
    };

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Switch>
            <Route path={'/login'}>
              <h1>This is mock Login screen</h1>
            </Route>
            <Route>
              <FavoriteButton
                id={1}
                isFavorite={false}
                type={type}
              />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/This is mock Login screen/i)).toBeInTheDocument();
  });

  it('should set favorite when clicked', () => {
    const type = {name: 'place-card', width: 18, height: 19};
    const storeFakeData = {
      AUTH: {status: 'AUTH'},
      FORM: {isSending: false},
    };
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <FavoriteButton
            id={1}
            isFavorite
            type={type}
          />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByRole('button'));
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).nthCalledWith(1, {
      type: 'data/setSendingFlag',
      payload: true,
    });
    expect(dispatch).nthCalledWith(2, 'updated store data after async action');
  });
});
