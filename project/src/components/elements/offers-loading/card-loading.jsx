import React from 'react';
import ContentLoader from 'react-content-loader';
import { Preloader } from '../../../const';
const { SIZE, SPEED } = Preloader;

export default function CardLoading() {
  return (
    <ContentLoader
      data-testid={'card-loading'}
      speed={SPEED}
      width={SIZE.Card.WIDTH}
      height={SIZE.Card.HEIGHT}
      viewBox="0 0 268 342"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="0" ry="0" width="260" height="200" />
      <rect x="0" y="210" rx="0" ry="0" width="260" height="22" />
      <rect x="0" y="240" rx="0" ry="0" width="75" height="12" />
      <rect x="0" y="260" rx="0" ry="0" width="260" height="36" />
      <rect x="0" y="305" rx="0" ry="0" width="75" height="12" />
    </ContentLoader>
  );
}
