import React from 'react';
import { render, screen } from '@testing-library/react';
import OffersLoading from './offers-loading';

describe('component OffersLoading', () => {
  it('should render correctly by a given card count', () => {
    const offersCount = 3;
    render(<OffersLoading offersCount={offersCount}/>);

    expect(screen.getAllByTestId('card-loading').length).toBe(offersCount);
  });
});
