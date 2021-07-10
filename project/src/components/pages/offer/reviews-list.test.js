import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReviewsList } from './reviews-list';

describe('component ReviewsList', () => {
  it('should render correctly', () => {
    const fakeReview = {
      id: 1,
      rating: 4.8,
      comment: 'some comment',
      date: new Date(),
      user: {
        id: 1,
        isPro: false,
        name: 'some name',
        avatarUrl: 'avatar-url.com',
      },
    };
    const fakeReviews = [fakeReview];

    render(<ReviewsList reviews={fakeReviews} />);

    const reviewElements = screen.getAllByRole('listitem');
    expect(reviewElements.length === fakeReviews.length).toBeTruthy();
    expect(screen.getByRole('list')).toHaveClass('reviews__list');
  });
});
