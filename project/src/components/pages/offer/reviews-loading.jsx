import React from 'react';
import ContentLoader from 'react-content-loader';

export default function ReviewLoading() {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Loading reviews ...
      </h2>
      <div className="reviews__list">
        <ContentLoader
          data-testid={'reviews-preloader'}
          speed={2}
          width={613}
          height={130}
          viewBox="0 0 613 130"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="10" y="72" rx="3" ry="3" width="38" height="12" />
          <rect x="73" y="7" rx="2" ry="2" width="94" height="17" />
          <rect x="75" y="37" rx="0" ry="0" width="475" height="14" />
          <rect x="75" y="62" rx="0" ry="0" width="475" height="14" />
          <rect x="75" y="86" rx="0" ry="0" width="475" height="14" />
          <rect x="75" y="117" rx="0" ry="0" width="67" height="14" />
          <circle cx="28" cy="34" r="27" />
        </ContentLoader>
      </div>
    </section>
  );
}
