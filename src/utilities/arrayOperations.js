export const findItem = (arr, index, indexVal) => {
  arr.findIndex((item) => {
    if (item[index] === indexVal) {
      return item;
    }
    return false;
  });
};

export const available = (data, searchTerm, index) => data?.filter((option) => {
  const temp = option.constructor === Object ? option[index] : option;
  return temp?.toLowerCase()?.includes(searchTerm?.toLowerCase());
});
