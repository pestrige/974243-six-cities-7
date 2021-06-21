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

export const filterOffers = (offers, cityName) => offers.filter((offer) => offer.city.name === cityName);
