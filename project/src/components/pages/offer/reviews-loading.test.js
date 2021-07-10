import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewLoading from './reviews-loading';

describe('component ReviewLoading', () => {
  it('should render correctly', () => {
    render(<ReviewLoading />);

    expect(screen.getByRole('heading')).toHaveTextContent('Loading reviews ...');
    expect(screen.getByTestId('reviews-preloader')).toHaveAttribute('width', '613');
    expect(screen.getByTestId('reviews-preloader')).toHaveAttribute('height', '130');
  });
});
