import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoute, FavoriteButtonType } from '../../../const';
import { getIsAuth, getIsSending } from '../../../store/selectors';
import { switchFavorite } from '../../../store/api-action';
import { setSendingFlag } from '../../../store/action';

const getClassName = (isFavorite, name) => (
  `${isFavorite
    ? `${name}__bookmark-button--active`
    : ''} ${name}__bookmark-button button`
);

export default function FavoriteButton({
  id,
  isFavorite,
  type = FavoriteButtonType.DEFAULT }) {

  const {name, width, height} = type;
  const isAuth = useSelector(getIsAuth);
  const isSending = useSelector(getIsSending);
  const history = useHistory();
  const dispatch = useDispatch();
  const isNeedToUpdateOffer = type.name === FavoriteButtonType.OFFER.name;

  const handleClick = () => {
    if (!isAuth) {
      return history.push(AppRoute.LOGIN);
    }

    dispatch(setSendingFlag(true));
    dispatch(switchFavorite(id, isFavorite, isNeedToUpdateOffer));
  };

  return (
    <button
      className={getClassName(isFavorite, name)}
      type="button"
      onClick={handleClick}
      disabled={isSending}
    >
      <svg
        className={`${name}__bookmark-icon`}
        width={width}
        height={height}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

FavoriteButton.propTypes = {
  id: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  type: PropTypes.shape({
    name: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};
