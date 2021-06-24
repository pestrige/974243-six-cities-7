import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../../header/header';
import Offers from '../../offers/offers';
import Map from '../../map/map';
import Gallery from './gallery';
import Good from './good';
import Reviews from './reviews';
import OfferLoading from './offer-loading';
import { getPersentage } from '../../../utils/common';
import { OfferType, CardType, MapClass, CLOSEST_OFFERS_COUNT } from '../../../const';
import reviewsProp from './reviews.prop';
import offerProp from '../../card/card.prop';
import offersProp from '../../offers/offers.prop';

function Offer({id, currentOffer, closestOffers, reviews, isDataLoaded}) {
  if (!isDataLoaded) {
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

  window.scrollTo(0, 0);

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
                <button className={`${isFavorite ? 'property__bookmark-button--active' : ''} property__bookmark-button button`} type="button">
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
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
              <Reviews reviews={reviews} id={id}/>
            </div>
          </div>
          <Map
            key={id}
            offers={closestOffers}
            type={MapClass.OFFER}
            city={city}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <Offers offers={closestOffers} type={CardType.CLOSEST} />
          </section>
        </div>
      </main>
    </div>
  );
}

Offer.propTypes = {
  id: PropTypes.number.isRequired,
  currentOffer: offerProp,
  closestOffers: offersProp,
  reviews: reviewsProp,
  isDataLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, {id}) => ({
  reviews: state.reviews,
  currentOffer: state.offers.find((offer) => offer.id === id),
  closestOffers: state.offers
    .filter((offer) => offer.city.name === (state.offers.find((item) => item.id === id)).city.name && offer.id !== id)
    .slice(0, CLOSEST_OFFERS_COUNT),
  isDataLoaded: state.isDataLoaded,
});

export { Offer };
export default connect(mapStateToProps, null)(Offer);
