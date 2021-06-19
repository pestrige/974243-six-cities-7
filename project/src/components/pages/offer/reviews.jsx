import React from 'react';
import Review from './review';
import Form from './form';
import PropTypes from 'prop-types';
import reviewProp from './review.prop';

export default function Reviews({reviews, id}) {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {
          reviews.map((review) => <Review key={review.id} review={review} />)
        }
      </ul>
      <Form key={id}/>
    </section>
  );
}

Reviews.propTypes = {
  reviews: PropTypes.oneOfType([
    PropTypes.shape([]),
    PropTypes.arrayOf(reviewProp).isRequired,
  ]),
  id: PropTypes.string.isRequired,
};
