import React from 'react';
import PropTypes from 'prop-types';

const MAX_IMAGES = 6;
export default function Gallery({images}) {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {
          images.slice(0, MAX_IMAGES).map((image) => (
            <div key={image} className="property__image-wrapper">
              <img className="property__image" src={image} alt="Studio" />
            </div>
          ))
        }
      </div>
    </div>
  );
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};
