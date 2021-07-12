import React from 'react';
import { render, screen } from '@testing-library/react';
import Review from './review';
import { formatDate } from '../../../utils/common';

describe('component Gallery', () => {
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
    render(<Review review={fakeReview} />);
    const {comment, date, user } = fakeReview;
    expect(screen.getByRole('img')).toHaveAttribute('src', user.avatarUrl);
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByTestId('persent-rating')).toHaveStyle('width: 96%');
    expect(screen.getByText(comment)).toBeInTheDocument();
    expect(screen.getByTestId('comment-time')).toHaveAttribute('datetime', formatDate(date));
    expect(screen.getByTestId('comment-time')).toHaveTextContent(formatDate(date, true));
  });
});
