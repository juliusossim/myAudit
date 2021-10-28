import _ from 'lodash';
import { resetAction, updateSuccess } from '../../redux/actions/projectActions';

/**
 * @param arr
 * @param dispatch
 */

const useUpdateStore = (arr, dispatch) => {
  arr.map((item) => {
    if (!_.isEmpty(item.data)) {
      if (_.isEmpty(item.response)) {
        dispatch(resetAction({ action: item.action }));
      } else {
        dispatch(updateSuccess({ action: item.action, response: item.response }));
      }
    }
    return false;
  });
};
export default useUpdateStore;
