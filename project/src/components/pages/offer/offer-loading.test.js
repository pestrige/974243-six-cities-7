import React from 'react';
import { render, screen } from '@testing-library/react';
import OfferLoading from './offer-loading';

jest.mock('../../elements/header/header', () => ({
  __esModule: true,
  default() {
    return <div>This is the mock Header</div>;
  },
}));

describe('component ReviewLoading', () => {
  it('should render correctly', () => {
    render(<OfferLoading />);

    expect(screen.getByText('This is the mock Header')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('page__main page__main--property', {exact: true});
    expect(screen.getByTestId('offer-preloader')).toHaveAttribute('width', '790');
    expect(screen.getByTestId('offer-preloader')).toHaveAttribute('height', '700');
  });
});
