import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../../../store/action';
const SHOW_TIME = 5000;

function Toast({message, isShown, onHide}) {
  const {pathname} = useLocation();

  useEffect(() => {
    if (isShown) {
      return () => onHide();
    }
  }, [isShown, pathname, onHide]); // удаляем тост, если ушли со страницы

  useEffect(() => setTimeout(() => onHide(), SHOW_TIME));

  return isShown && (
    <div className="toast-item">
      <div className='toast-item__text'>
        {message}
      </div>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  isShown: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.toast.message,
  isShown: state.toast.isShown,
});

const mapDispatchToProps = (dispatch) => ({
  onHide() {
    dispatch(ActionCreator.hideToast());
  },
});

export { Toast };
export default connect(mapStateToProps, mapDispatchToProps)(Toast);
