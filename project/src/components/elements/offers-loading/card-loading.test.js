import React from 'react';
import { render, screen } from '@testing-library/react';
import CardLoading from './card-loading';

describe('component CardLoading', () => {
  it('should render correctly by a given width and height', () => {
    const size = {width: '268', height: '342'};
    render(<CardLoading/>);

    expect(screen.getByTestId('card-loading')).toHaveAttribute('width', size.width);
    expect(screen.getByTestId('card-loading')).toHaveAttribute('height', size.height);
  });
});
