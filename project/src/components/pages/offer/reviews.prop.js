import PropTypes from 'prop-types';
import reviewProp from './review.prop';

export default PropTypes.oneOfType([
  PropTypes.shape([]),
  PropTypes.arrayOf(reviewProp).isRequired,
]);
