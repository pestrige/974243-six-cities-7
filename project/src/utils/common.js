const MAX_RATING = 5;
const MAX_PERSENTAGE = 100;
const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const getPersentage = (rating) => rating * MAX_PERSENTAGE / MAX_RATING;

export const formatDate = (date, isFull = false) => {
  const year = date.getFullYear();
  const rawMonth = date.getMonth();
  const month = rawMonth < 10 ? `0${rawMonth}` : rawMonth;
  const day = date.getDate();

  return isFull ? `${Months[rawMonth]} ${year}` : `${year}-${month}-${day}`;
};
