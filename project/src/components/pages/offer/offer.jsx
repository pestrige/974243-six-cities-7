import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../elements/header/header';
import Offers from '../../elements/offers/offers';
import Map from '../../elements/map/map';
import Gallery from './gallery';
import Good from './good';
import Reviews from './reviews';
import OfferLoading from './offer-loading';
import OffersLoading from '../../elements/offers-loading/offers-loading';
import FavoriteButton from '../../elements/favorite-button/favorite-button';

import { fetchOffer, fetchClosestOffers } from '../../../store/api-action';
import { getPersentage } from '../../../utils/common';
import { OfferType, CardType, MapClass, CLOSEST_OFFERS_COUNT, AppRoute, FavoriteButtonType } from '../../../const';
import { clearOfferData } from '../../../store/action';
import { getCurrentOffer, getClosestOffers, getIsOfferLoaded, getIsClosestOffersLoaded, getIsError404 } from '../../../store/selectors';

function Offer({id}) {
  const currentOffer = useSelector(getCurrentOffer);
  const closestOffers = useSelector(getClosestOffers);
  const isOfferLoaded = useSelector(getIsOfferLoaded);
  const isClosestOffersLoaded = useSelector(getIsClosestOffersLoaded);
  const isError404 = useSelector(getIsError404);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOffer(id));
    window.scrollTo(0, 0);
    return dispatch(clearOfferData());
  }, [id, dispatch]);

  useEffect(() => {
    if (isOfferLoaded && !isError404) {
      dispatch(fetchClosestOffers(id));
    }
  }, [id, dispatch, isOfferLoaded, isError404]);

  if (isError404) {
    return <Redirect to={AppRoute.NOT_FOUND} />;
  }

  if (!isOfferLoaded) {
    return <OfferLoading />;
  }

  const {
    city,
    images,
    isPremium,
    isFavorite,
    price,
    rating,
    title,
    type,
    bedrooms,
    maxAdult,
    goods,
    host,
    description,
  } = currentOffer;

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <Gallery images={images} />
          <div className="property__container container">
            <div className="property__wrapper">
              {
                isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <FavoriteButton id={id} isFavorite={isFavorite} type={FavoriteButtonType.OFFER} />
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getPersentage(rating)}%`}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {OfferType[type]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdult} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good) => (
                    <Good
                      key={good.toLowerCase().replace(/\s+/g, '')}
                      good={good}
                    />
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`${host.isPro ? 'property__avatar-wrapper--pro' : ''} property__avatar-wrapper user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width={74} height={74} alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  {
                    host.isPro &&
                      <span className="property__user-status">
                        Pro
                      </span>
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <Reviews id={id} />
            </div>
          </div>
          <Map
            key={id}
            offers={[...closestOffers, currentOffer]}
            activeOffer={currentOffer}
            type={MapClass.OFFER}
            city={city}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            {
              isClosestOffersLoaded
                ? <Offers offers={closestOffers} type={CardType.CLOSEST} />
                : <div className="near-places__list places__list"><OffersLoading offersCount={CLOSEST_OFFERS_COUNT} /></div>
            }
          </section>
        </div>
      </main>
    </div>
  );
}

Offer.propTypes = {
  id: PropTypes.number.isRequired,
};

export { Offer };
export default Offer;
