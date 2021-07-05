import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import ReviewsLoading from './reviews-loading';
import ReviewsList from './reviews-list';
import Form from './form';

import { fetchReviews } from '../../../store/api-action';
import { getIsAuth, getReviews, getIsReviewsLoaded } from '../../../store/selectors';

function Reviews({id}) {
  const reviews = useSelector(getReviews);
  const isDataLoaded = useSelector(getIsReviewsLoaded);
  const isAuth = useSelector(getIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  if (!isDataLoaded) {
    return <ReviewsLoading />;
  }

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ReviewsList reviews={reviews} />
      {
        isAuth && <Form offerID={id} />
      }
    </section>
  );
}

Reviews.propTypes = {
  id: PropTypes.number.isRequired,
};

export { Reviews };
export default Reviews;
