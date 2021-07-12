import React from 'react';
import { render } from '@testing-library/react';
import EmptyMain from './empty-main';

describe('component EmptyMain', () => {
  it('should render correctly', () => {
    const city = {name: 'Paris'};
    const { getByText } = render(<EmptyMain cityName={city.name} />);

    expect(getByText('No places to stay available')).toBeInTheDocument();
    expect(getByText(`We could not find any property available at the moment in ${city.name}`)).toBeInTheDocument();
  });
});
