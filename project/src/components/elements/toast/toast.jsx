import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../../../store/action';
import { getIsToastShown, getToastMessage } from '../../../store/selectors';
const SHOW_TIME = 5000;

function Toast() {
  const message = useSelector(getToastMessage);
  const isShown = useSelector(getIsToastShown);
  const dispatch = useDispatch();
  const {pathname} = useLocation();

  useEffect(() => {
    if (isShown) {
      return () => dispatch(hideToast());
    }
  }, [isShown, pathname, dispatch]); // удаляем тост, если ушли со страницы

  useEffect(() => setTimeout(() => dispatch(hideToast()), SHOW_TIME));

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
