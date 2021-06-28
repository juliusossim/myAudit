import addDays from 'date-fns/addDays';

const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

export const diffDays = (
  { firstDate, secondDate }
) => Math.round(Math.abs((firstDate - secondDate) / oneDay));
/**
 * todo: addDays implementation
 * @type {number}
 */
export const addDaysToDate = console.log('here');
