import PropTypes from 'prop-types';
import { OfferType } from '../../const';

export default PropTypes.oneOfType([
  PropTypes.shape({}),
  PropTypes.shape({
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
    }),
    previewImage: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.oneOf([...Object.keys(OfferType)]).isRequired,
    bedrooms: PropTypes.number.isRequired,
    maxAdult: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    goods: PropTypes.array.isRequired,
    host: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isPro: PropTypes.bool.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
    description: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
    id: PropTypes.number.isRequired,
  }),
]);
