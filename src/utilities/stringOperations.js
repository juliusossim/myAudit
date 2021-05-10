/**
 *
 * @param slug the slug to convert to normal string
 * @param dash the slug pattern
 * @returns {*} the converted normal string
 */
export const slugToString = (slug, dash = '_') => {
  const result = slug.split(dash);
  for (let i = 0; i < result.length;) {
    const word = result[i];
    result[i] = word.charAt(0).toUpperCase() + word.slice(1);
    i += 1;
  }
  return result.join(' ');
};
/**
 * this converts normal strings to a slug
 *
 * N.B: the string must be blank separated i.e a normal string!
 * @param string string to convert to slug
 * @param dash the slug pattern
 * @returns {*} the converted slug
 */
export const slugify = (string, dash = '_') => string.replace(' ', dash);

/**
 * @param fullName :
  * full name to dissect
 * @param first :
  * boolean value to determine the return value. this value is true by default.
 * if first is true, first name will be returned otherwise, last name is returned
 * @returns {*} first name or last name.
 */
export const getOneName = (fullName, first = true) => {
  const names = fullName.split(' ');
  return first ? names[0] : names[1];
};
