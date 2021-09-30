import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

export const diffDays = (
  { firstDate, secondDate }
) => Math.round(Math.abs((firstDate - secondDate) / oneDay));
/**
  todo: addDays implementation
  @type {string}
  @param endDate: the end date
 */
export const positiveDiffs = (endDate) => {
  if (isValid(endDate)) {
    return formatDistanceToNow(new Date(endDate), { addSuffix: true });
  }
  return null;
};

/**
  todo: addDays implementation
  @type {function(date): string | *}
  @param date: the end date
 */
export const greeter = (date) => {
  let greet = 'Good';
  const time = format(new Date(date), 'bbb');
  switch (time) {
  case 'AM':
    greet += ' morning';
    return greet;
  case 'PM':
    greet += ' evening';
    return greet;
  case 'noon':
    greet += ' afternoon';
    return greet;
  default:
    greet += ' night';
    return greet;
  }
};
