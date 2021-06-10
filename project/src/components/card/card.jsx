import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, OfferType } from '../../const';
import { getPersentage } from '../../utils/common';
import offerProp from './card.prop';
import PropTypes from 'prop-types';

export default function Card({offer, isClosest = false}) {
  const {
    id,
    previewImage,
    isPremium,
    isFavorite,
    price,
    rating,
    title,
    type,
  } = offer;
  const cardClass = isClosest ? 'near-places__card' : 'cities__place-card';
  const wrapperClass = isClosest ? 'near-places__image-wrapper' : 'cities__image-wrapper';

  return (
    <article className={`${cardClass} place-card`}>
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${wrapperClass} place-card__image-wrapper`}>
        <Link to={`${AppRoute.OFFER}/${id}`}>
          <img className="place-card__image" src={previewImage} width={260} height={200} alt="Place" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={`${isFavorite ? 'place-card__bookmark-button--active' : ''} place-card__bookmark-button button`} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getPersentage(rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OFFER}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{OfferType[type]}</p>
      </div>
    </article>
  );
}

Card.propTypes = {
  offer: offerProp,
  isClosest: PropTypes.bool,
};
