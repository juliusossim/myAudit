export const findItem = (arr, index, indexVal) => {
  arr.findIndex((item) => {
    if (item[index] === indexVal) {
      return item;
    }
    return false;
  });
};

export const item = '';
