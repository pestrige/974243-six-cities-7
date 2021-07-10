import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FavoriteButton from '../favorite-button/favorite-button';
import { AppRoute, OfferType, CardType } from '../../../const';
import { getPersentage } from '../../../utils/common';
import offerProp from './card.prop';

const CardImageSize = {
  DEFAULT: {
    width: 260,
    height: 200,
  },
  FAVORITE: {
    width: 150,
    height: 110,
  },
};

function Card({
  offer,
  cardType = CardType.DEFAULT,
  handleMouseEnter = null,
  isActive = false }) {
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

  return (
    <article
      className={`${cardType}__card place-card ${isActive ? 'place-card--active' : ''}`}
      onMouseEnter={
        cardType === CardType.DEFAULT
          ? () => handleMouseEnter(offer)
          : null
      }
      onMouseLeave={
        cardType === CardType.DEFAULT
          ? () => handleMouseEnter({})
          : null
      }
    >
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div data-testid={`image-wrapper-${id}`} className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.OFFER}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={cardType === CardType.FAVORITE ? CardImageSize.FAVORITE.width : CardImageSize.DEFAULT.width}
            height={cardType === CardType.FAVORITE ? CardImageSize.FAVORITE.height : CardImageSize.DEFAULT.height}
            alt="Place"
          />
        </Link>
      </div>
      <div data-testid={`card-info-${id}`} className={`${cardType}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <FavoriteButton id={id} isFavorite={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span data-testid={`rating-${id}`} style={{width: `${getPersentage(rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OFFER}/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{OfferType[type]}</p>
      </div>
    </article>
  );
}

Card.propTypes = {
  offer: offerProp,
  cardType: PropTypes.string,
  handleMouseEnter: PropTypes.func,
  isActive: PropTypes.bool,
};

export { Card };
export default memo(Card);
