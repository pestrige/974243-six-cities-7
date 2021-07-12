import React from 'react';
import { render } from '@testing-library/react';
import Empty from './empty';

describe('component LoginLink', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Empty />);

    expect(getByText('Favorites (empty)')).toBeInTheDocument();
    expect(getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });
});
