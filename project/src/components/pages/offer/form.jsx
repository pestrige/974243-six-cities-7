import React, { useState } from 'react';
const STARS_COUNT = 5;
const RatingTitle = {
  1: 'terribly',
  2: 'badly',
  3: 'not bad',
  4: 'good',
  5: 'perfect',
};
const InputName = {
  RATING: 'rating',
  COMMENT: 'comment',
};

export default function Form() {
  const [form, setForm] = useState({
    [InputName.RATING]: null,
    [InputName.COMMENT]: '',
  });

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setForm({
      ...form,
      [name]: name === InputName.RATING ? Number(value) : value,
    });
  };

  return (
    <form onChange={handleChange} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          new Array(STARS_COUNT).fill('')
            .map((_, id) => {
              const counter = STARS_COUNT - id;
              return (
                <React.Fragment key={`star-${counter}`}>
                  <input
                    id={`${counter}-stars`}
                    value={counter}
                    className="form__rating-input visually-hidden"
                    name={InputName.RATING}
                    type="radio"
                    defaultChecked={counter === form.rating}
                  />
                  <label
                    htmlFor={`${counter}-stars`}
                    title={RatingTitle[counter]}
                    className="reviews__rating-label form__rating-label"
                  >
                    <svg className="form__star-image" width={37} height={33}>
                      <use xlinkHref="#icon-star" />
                    </svg>
                  </label>
                </React.Fragment>
              );})
        }
      </div>
      <textarea name={InputName.COMMENT} minLength={50} defaultValue={form.comment} className="reviews__textarea form__textarea" id={InputName.COMMENT} placeholder="Tell how was your stay, what you like and what can be improved" />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
          stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}
