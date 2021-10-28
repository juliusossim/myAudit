import { useEffect } from 'react';

/**
 * @param history {any}
 * @param path {string}
 * @param resetRoute {string}
 */

const useRefresh = ({ history, path, resetRoute = '/home' }) => {
  let handler;

  const refresh = () => {
    history.push(resetRoute);

    handler = setTimeout(() => history.push(path), 10);
  };

  useEffect(() => () => handler && clearTimeout(handler), [handler]);

  return refresh;
};
export default useRefresh;
