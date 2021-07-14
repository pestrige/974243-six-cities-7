import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SortItem from './sort-item';
import userEvent from '@testing-library/user-event';

describe('component SortItem', () => {
  it('should render correctly with no active flag', () => {
    const history = createMemoryHistory();
    const sortType = {name: 'default', text: 'Popular'};

    render(
      <Router history={history}>
        <SortItem
          type={'DEFAULT'}
          isActive={false}
          handleClick={() => {}}
        />
      </Router>,
    );

    expect(screen.getByText(sortType.text)).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toHaveClass('places__option', {exact: true});
  });

  it('should render correct CSS class with active flag', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <SortItem
          type={'DEFAULT'}
          isActive
          handleClick={() => {}}
        />
      </Router>,
    );

    expect(screen.getByRole('listitem')).toHaveClass('places__option places__option--active', {exact: true});
  });

  it('should call handleClick when click', () => {
    const history = createMemoryHistory();
    const handleClick = jest.fn();
    render(
      <Router history={history}>
        <SortItem
          type={'DEFAULT'}
          isActive
          handleClick={handleClick}
        />
      </Router>,
    );

    userEvent.click(screen.getByRole('listitem'));
    expect(handleClick).toBeCalled();
    expect(handleClick).toBeCalledWith({name: 'default', text: 'Popular'});
  });
});
