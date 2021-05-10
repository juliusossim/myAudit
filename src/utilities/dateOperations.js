const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

export const diffDays = (
  { firstDate, secondDate }
) => Math.round(Math.abs((firstDate - secondDate) / oneDay));
/**
 * todo: addDays implementation
 * @type {number}
 */
export const addDays = Math.round(Math.abs((1 + 2) / oneDay));
