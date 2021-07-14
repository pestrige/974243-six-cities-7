import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import Toast from './toast';

const mockStore = configureStore();
const history = createMemoryHistory();

describe('component Sort', () => {
  it('should render and hide correctly', () => {
    jest.useFakeTimers();
    const storeFakeData = {
      ERROR: {toast: {isShown: true, message: 'test message'}},
    };
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const { rerender } = render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Toast />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('test message')).toBeInTheDocument();
    jest.runAllTimers();
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: 'app/hideToast',
    });

    rerender(
      <Provider store={mockStore({
        ERROR: {toast: {isShown: false, message: 'test message'}},
      })}
      >
        <Router history={history}>
          <Toast />
        </Router>
      </Provider>,
    );
    expect(screen.queryByText('test message')).not.toBeInTheDocument();
  });
});

