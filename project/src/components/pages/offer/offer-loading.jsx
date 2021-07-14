import React from 'react';
import ContentLoader from 'react-content-loader';
import Header from '../../elements/header/header';
import { Preloader } from '../../../const';
const { SIZE, SPEED } = Preloader;

export default function OfferLoading() {
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property container">
          <div className="property__empty">
            <ContentLoader
              data-testid={'offer-preloader'}
              speed={SPEED}
              width={SIZE.Offer.WIDTH}
              height={SIZE.Offer.HEIGHT}
              viewBox="0 0 790 700"
              backgroundColor="#d6d6d6"
              foregroundColor="#ebebeb"
            >
              <rect x="0" y="0" rx="0" ry="0" width="260" height="200" />
              <rect x="265" y="0" rx="0" ry="0" width="260" height="200" />
              <rect x="531" y="0" rx="0" ry="0" width="260" height="200" />
              <rect x="0" y="207" rx="0" ry="0" width="260" height="200" />
              <rect x="265" y="207" rx="0" ry="0" width="260" height="200" />
              <rect x="531" y="207" rx="0" ry="0" width="260" height="200" />
              <rect x="174" y="441" rx="0" ry="0" width="439" height="55" />
              <rect x="279" y="514" rx="0" ry="0" width="237" height="23" />
              <rect x="171" y="558" rx="0" ry="0" width="137" height="17" />
              <rect x="327" y="558" rx="0" ry="0" width="137" height="17" />
              <rect x="479" y="558" rx="0" ry="0" width="137" height="17" />
              <rect x="288" y="608" rx="0" ry="0" width="223" height="37" />
            </ContentLoader>
          </div>
        </section>
      </main>
    </div>
  );
}
