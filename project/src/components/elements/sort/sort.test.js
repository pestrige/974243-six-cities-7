import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { Sort } from './sort';
import userEvent from '@testing-library/user-event';

const mockStore = configureStore();
const history = createMemoryHistory();

describe('component Sort', () => {
  it('should render correctly', () => {
    const sortType = {name: 'default', text: 'Popular'};
    const sortTypesCount = 4;
    const storeFakeData = {
      APP: {sortType},
    };

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Sort />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByTestId('sort-type-title')).toHaveTextContent(sortType.text);
    expect(screen.getByRole('list')).toHaveClass('places__options places__options--custom', {exact: true});
    expect(screen.getAllByRole('listitem').length).toBe(sortTypesCount);
  });

  it('should rotate arrow and change class when click', () => {
    const sortType = {name: 'default', text: 'Popular'};
    const storeFakeData = {
      APP: {sortType},
    };
    const {container} = render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Sort />
        </Router>
      </Provider>,
    );
    expect(container.querySelector('.places__sorting-arrow')).not.toHaveStyle({transform: 'rotate(180deg)', top: '35%'});
    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
    userEvent.click(screen.getByTestId('sort-type-title'));
    expect(container.querySelector('.places__sorting-arrow')).toHaveStyle({transform: 'rotate(180deg)', top: '35%'});
    expect(screen.getByRole('list')).toHaveClass('places__options--opened');
  });

  it('should change sort when click on the sort item', () => {
    const sortType = {name: 'default', text: 'Popular'};
    const storeFakeData = {
      APP: {sortType},
    };
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Sort />
        </Router>
      </Provider>,
    );
    userEvent.click(screen.getByTestId('sort-type-title'));
    userEvent.click(screen.getAllByRole('listitem')[1]);
    expect(useDispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: 'app/sort',
      payload: {name: 'lowPrice', text: 'Price: low to high'},
    });
  });
});
