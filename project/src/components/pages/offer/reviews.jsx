import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ReviewsLoading from './reviews-loading';
import Review from './review';
import Form from './form';

import { fetchReviews } from '../../../store/api-action';
import { AuthorizationStatus, MAX_REVIEWS } from '../../../const';
import reviewsProp from './reviews.prop';

function Reviews({reviews, id, isAuth, isDataLoaded, loadReviews}) {
  useEffect(() => {
    loadReviews(id);
  }, [loadReviews, id]);

  if (!isDataLoaded) {
    return <ReviewsLoading />;
  }

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
      {
        isAuth && <Form offerID={id} />
      }
    </section>
  );
}

Reviews.propTypes = {
  reviews: reviewsProp,
  id: PropTypes.number.isRequired,
  isAuth: PropTypes.bool.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  loadReviews: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  reviews: state.reviews.slice(0, MAX_REVIEWS),
  isAuth: state.authInfo.status === AuthorizationStatus.AUTH,
  isDataLoaded: state.isDataLoaded.reviews,
});

const mapDispatchToState = (dispatch) => ({
  loadReviews(id) {
    dispatch(fetchReviews(id));
  },
});

export { Reviews };
export default connect(mapStateToProps, mapDispatchToState)(Reviews);
