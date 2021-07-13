import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import createMockStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import Form from './form';

const history = createMemoryHistory();
const mockStore = createMockStore();

const RatingTitle = {
  1: 'terribly',
  2: 'badly',
  3: 'not bad',
  4: 'good',
  5: 'perfect',
};

describe('Component From', () => {
  it('should render correctly', () => {
    const starsCount = 5;
    const storeFakeData = {
      FORM: {isSending: false, data: {rating: null, comment: ''}},
      ERROR: {toast: {isShown: false}},
    };
    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Form offerID={1} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByTestId('new-comment')).toHaveClass('reviews__form form', {exact: true});
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(starsCount);
    radios.forEach(((radio, id) => {
      const counter = starsCount - id;
      expect(radio).toBeEnabled();
      expect(radio).not.toBeChecked();
      expect(radio).toHaveAttribute('id', `${counter}-stars`);
      expect(screen.getByTitle(RatingTitle[counter])).toBeInTheDocument();
    }));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeEnabled();
    expect(screen.getByRole('button')).toHaveTextContent('Submit');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should send data when type', () => {
    const storeFakeData = {
      FORM: {isSending: false, data: {rating: null, comment: ''}},
      ERROR: {toast: {isShown: false}},
    };
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Form offerID={1} />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getAllByRole('radio')[4]);
    expect(dispatch).toBeCalledWith({
      payload: {
        comment: '',
        rating: 1,
      },
      type: 'app/setForm',
    });
    userEvent.type(screen.getByRole('textbox'), 'w');
    expect(dispatch).toBeCalledWith({
      payload: {
        comment: 'w',
        rating: null,
      },
      type: 'app/setForm',
    });
  });
});
