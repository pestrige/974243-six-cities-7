import PropTypes from 'prop-types';
import userInfoProp from '../../elements/header/userInfo.prop';

export default PropTypes.shape({
  status: PropTypes.string.isRequired,
  userData: userInfoProp,
});
