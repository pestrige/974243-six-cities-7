import { SortType } from '../const';

const MAX_RATING = 5;
const MAX_PERSENTAGE = 100;
const MONTH_SHIFT = 1;
const MONTH_DIGITS = 9;
const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const getPersentage = (rating) => rating * MAX_PERSENTAGE / MAX_RATING;

export const formatDate = (date, isFull = false) => {
  const year = date.getFullYear();
  const rawMonth = date.getMonth();
  const month = rawMonth < MONTH_DIGITS ? `0${rawMonth + MONTH_SHIFT}` : rawMonth + MONTH_SHIFT;
  const day = date.getDate();

  return isFull ? `${Months[rawMonth]} ${year}` : `${year}-${month}-${day}`;
};

const filterByCity = (offers, cityName) => offers.filter((offer) => offer.city.name === cityName);
const sortByPrice = (offers, lowToHight = false) => offers.slice()
  .sort((a, b) => lowToHight ? a.price - b.price : b.price - a.price);
const sortByRating = (offers) => offers.slice()
  .sort((a, b) => b.rating - a.rating);

export const sortOffers = (offers, cityName, type = SortType.DEFAULT.name) => {
  const filteredOffers = filterByCity(offers, cityName);

  switch (type) {
    case SortType.DEFAULT.name:
      return filteredOffers;
    case SortType.LOW_PRICE.name:
      return sortByPrice(filteredOffers, true);
    case SortType.HIGHT_PRICE.name:
      return sortByPrice(filteredOffers);
    case SortType.TOP_RATED.name:
      return sortByRating(filteredOffers);
    default:
      return offers;
  }
};

export const createOffersMap = (offers) => {
  const map = offers.reduce((acc, offer) => {
    acc[offer.city.name] = acc[offer.city.name]
      ? [...acc[offer.city.name], offer]
      : [offer];
    return acc;
  }, {});
  return Object.entries(map);
};
