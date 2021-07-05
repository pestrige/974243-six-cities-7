import React from 'react';
import reviewsProp from './reviews.prop';

import Review from './review';

function ReviewsList({reviews}) {
  return (
    <ul className="reviews__list">
      {
        reviews.map((review) => <Review key={review.id} review={review} />)
      }
    </ul>
  );
}

ReviewsList.propTypes = {
  reviews: reviewsProp,
};

export default React.memo(ReviewsList, (prevProps, nextProps) => (
  prevProps.reviews.length === nextProps.reviews.length
));
