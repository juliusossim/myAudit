import addDays from 'date-fns/addDays';
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
