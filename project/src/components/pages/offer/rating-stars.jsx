import React from 'react';

const STARS_COUNT = 5;
export default function RatingStars() {
  return (
    <div className="reviews__rating-form form__rating">
      {
        new Array(STARS_COUNT)
          .fill('')
          .map(() => (
            <React.Fragment key={Math.random()}>
              <input className="form__rating-input visually-hidden" name="rating" defaultValue={5} id="5-stars" type="radio" />
              <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </React.Fragment>
          ))
      }
    </div>
  );
}
