import React from 'react';
import { render, screen } from '@testing-library/react';
import Gallery from './gallery';


describe('component Gallery', () => {
  it('should render correctly', () => {
    const images = ['img-src-1', 'img-src-2', 'img-src-3'];
    render(<Gallery images={images} />);

    const imgElements = screen.getAllByRole('img');
    expect(imgElements.length).toBe(images.length);
    imgElements.forEach((img, i) => expect(img).toHaveAttribute('src', images[i]));
  });

  it('should render maximum 6 images', () => {
    const images = ['img-src-1', 'img-src-2', 'img-src-3', 'img-src-4', 'img-src-5', 'img-src-6', 'img-src-7'];
    render(<Gallery images={images} />);

    const imgElements = screen.getAllByRole('img');
    expect(imgElements.length <= 6).toBeTruthy();
  });
});
