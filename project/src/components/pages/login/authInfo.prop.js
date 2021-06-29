import PropTypes from 'prop-types';

export default PropTypes.shape({
  status: PropTypes.string.isRequired,
  userData: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
  ]),
});
