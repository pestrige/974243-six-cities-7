import PropTypes from 'prop-types';

export default PropTypes.oneOfType([
  PropTypes.shape({}),
  PropTypes.shape({
    token: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
]);
