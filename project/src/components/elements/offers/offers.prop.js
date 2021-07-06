import PropTypes from 'prop-types';
import offerProp from '../card/card.prop';

export default PropTypes.oneOfType([
  PropTypes.arrayOf(offerProp),
  PropTypes.shape([]),
]);
