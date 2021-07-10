import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { Sort } from './sort';

describe('component Sort', () => {
  it('should render correctly', () => {
    const mockStore = configureStore();
    const history = createMemoryHistory();
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
    const sortItems = screen.getAllByRole('listitem');
    expect(sortItems.length === sortTypesCount).toBeTruthy();
  });
});
