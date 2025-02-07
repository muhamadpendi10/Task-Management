export const checkZero = (num) => (num < 10 ? '0' + num : num);

export const getDate = (date) => {
  date = new Date(date);
  const time = checkZero(date.getHours()) + ':' + checkZero(date.getMinutes());
  const today =
    checkZero(date.getDay()) +
    '.' +
    checkZero(date.getMonth()) +
    '.' +
    date.getFullYear();
  return `${today} \n ${time}`;
};

export const getDateTimeLocal = (date) => {
  date = date.toISOString().split('.')[0];
  return date.substring(0, date.length - 3);
};
