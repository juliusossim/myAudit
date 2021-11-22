import React, { useEffect } from 'react';
import { isEmpty, isFunction } from 'lodash';
import { notifier } from '../../utilities/stringOperations';

/**
 * @param history {any}
 * @param emptyRedirect {string}
 * @param dataIndex {string}
 * @param store {object}
 * @param initialCallback {function}
 * @param failCallback {function}
 * @param successCallback {function}
 * @param emptyMsg {string}
 */

const useFetchData = ({
  push, emptyRedirect, dataIndex, emptyState, emptyCallback,
  store, initialCallback, failCallback, successCallback, emptyMsg
}) => {
  useEffect(() => {
    if (store?.status === 'initial') {
      isFunction(initialCallback) && initialCallback();
    }
    if (store?.status === 'failed') {
      notifier({
        title: 'Connection Failed',
        text: store?.message || 'Failed to connect to resource. Please retry',
        type: 'error'
      });
      isFunction(failCallback) && failCallback();
    }
    if (store?.status === 'success') {
      if (
        isEmpty(store.data[dataIndex])
        || (isFunction(emptyState) && emptyState(store.data[dataIndex]))
      ) {
        notifier({
          title: '',
          text: emptyMsg,
          type: 'info'
        });
        isFunction(push) && push(emptyRedirect);
        isFunction(emptyCallback) && emptyCallback();
      } else {
        console.log('call success');
        isFunction(successCallback) && successCallback();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store?.status]);
  return true;
};
export default useFetchData;
