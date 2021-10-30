import React from 'react';

const useStoreParams = (store) => ({
  status: store.status,
  data: store.data?.data,
  message: store.data?.message,
  backErrors: store.data?.errors
});
export default useStoreParams;
