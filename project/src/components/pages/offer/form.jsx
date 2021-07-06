import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { postReview } from '../../../store/api-action';
import { setSendingFlag, setForm, clearForm } from '../../../store/action';
import { getFormData, getIsSending, getIsToastShown } from '../../../store/selectors';

const STARS_COUNT = 5;
const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;
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

const checkDisabled = (commentLength, rating, isSendingFlag) => !(
  ((commentLength >= MIN_COMMENT_LENGTH && commentLength <= MAX_COMMENT_LENGTH)
  &&
  rating !== null)
  &&
  !isSendingFlag
);

function Form({offerID}) {
  const form = useSelector(getFormData);
  const isSending = useSelector(getIsSending);
  const isToastShown = useSelector(getIsToastShown);
  const dispatch = useDispatch();

  useEffect(() => dispatch(clearForm()), [dispatch, offerID]);

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    dispatch(setForm({
      ...form,
      [name]: name === InputName.RATING ? Number(value) : value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(postReview(offerID, form));
    dispatch(setSendingFlag(true));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`reviews__form form ${isToastShown ? 'shake' : ''}`}
      action="#"
      method="post"
    >
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
                    checked={counter === form.rating}
                    disabled={isSending}
                    onChange={handleChange}
                    className="form__rating-input visually-hidden"
                    name={InputName.RATING}
                    type="radio"
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
      <textarea
        id={InputName.COMMENT}
        value={form.comment}
        disabled={isSending}
        onChange={handleChange}
        name={InputName.COMMENT}
        minLength={50}
        className="reviews__textarea form__textarea"
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
          stay with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          disabled={checkDisabled(form.comment.length, form.rating, isSending)}
          className="reviews__submit form__submit button"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

Form.propTypes = {
  offerID: PropTypes.number.isRequired,
};

export { Form };
export default Form;
