import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../../../store/action';
import { getIsToastShown, getToastMessage } from '../../../store/selectors';
const SHOW_TIME = 5000;

const clearToast = (timer, dispatch) => {
  dispatch(hideToast());
  clearTimeout(timer);
};

function Toast() {
  const message = useSelector(getToastMessage);
  const isShown = useSelector(getIsToastShown);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => clearToast(timer, dispatch), SHOW_TIME);
    return () => clearToast(timer, dispatch);
  });

  return isShown && (
    <div className="toast-item">
      <div className='toast-item__text'>
        {message}
      </div>
    </div>
  );
}

export { Toast };
export default Toast;
