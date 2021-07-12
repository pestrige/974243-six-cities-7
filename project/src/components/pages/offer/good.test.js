import React from 'react';
import { render } from '@testing-library/react';
import Good from './good';


describe('component Gallery', () => {
  it('should render correctly', () => {
    const good = 'some good';
    const { getByRole } = render(<Good good={good} />);

    expect(getByRole('listitem')).toHaveTextContent(good);
  });
});
