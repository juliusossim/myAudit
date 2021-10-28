import { useEffect } from 'react';
import _ from 'lodash';

/**
 * @param nexActive
 * @param items
 * @param setItems
 */

const reOrderMedia = (nexActive, items, setItems) => {
  const temp = items.filter((item) => item !== nexActive);
  temp.push(nexActive);
  setItems(temp);
};

/**
 * @param back {boolean}
 * @param active {object}
 * @param setActive {function}
 * @param data {array}
 * @param lastIndex {number}
 * @param setData {function}
 * @param setSlideClss  {function}
 * @param slideCssRight {string}
 * @param slideCssLeft {string}
 */

const useCarouselControl = ({
  back, active, setActive, data, lastIndex, setData,
  setSlideClss, slideCssRight, slideCssLeft
}) => {
  const activeIndex = _.findLastIndex(data, (item) => item === active);
  const setClss = typeof setSlideClss === 'function';
  let nexActiveElement = null;
  const slideCss = back ? slideCssRight : slideCssLeft;
  const nexItemIndex = back ? activeIndex - 1 : activeIndex + 1;
  switch (activeIndex) {
  case 0:
    nexActiveElement = _.last(data);
    break;
  case lastIndex:
    nexActiveElement = _.head(data);
    break;
  default:
    nexActiveElement = data[nexItemIndex];
  }
  typeof setActive === 'function' && setActive(nexActiveElement);
  setClss && setSlideClss(slideCss);
  reOrderMedia(nexActiveElement, data, setData);
};
export default useCarouselControl;
