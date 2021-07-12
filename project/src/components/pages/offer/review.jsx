import React from 'react';
import reviewProp from './review.prop';
import { getPersentage, formatDate } from '../../../utils/common';

export default function Review({review}) {
  const {
    rating,
    comment,
    date,
    user,
  } = review;
  const {
    name,
    avatarUrl,
  } = user;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width={54} height={54} alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span data-testid={'persent-rating'} style={{width: `${getPersentage(rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time data-testid={'comment-time'} className="reviews__time" dateTime={formatDate(date)}>{formatDate(date, true)}</time>
      </div>
    </li>
  );
}

Review.propTypes = {
  review: reviewProp,
};
