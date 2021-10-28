import React, { useEffect } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import Loader from '../microComponents/loader';
import { notifier, stringDoesNotExist } from '../../utilities/stringOperations';
import { resetAction } from '../../redux/actions/projectActions';
import NoData1 from '../../pages/authentication/NoData1';
import useRefresh from '../hooks/useRefresh';

const PageTemp = ({
  store, view, setErrors, noData, action, initial, isPending, retry, redirect
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // console.log(history.location.pathname);
  const refresh = useRefresh({
    history,
    path: history.location.pathname
  });
  const path = (route) => history.location.pathname.startsWith(route);

  useEffect(() => {
    if (store?.status === 'failed') {
      /* reset the state to initial; this reloads the
       initial view and allows for fresh api interactions if necessary */
      !stringDoesNotExist(action)
      && dispatch(resetAction({ action }));

      /* push errors to page for mapping agianst form fields or any rendering */
      if (!_.isEmpty(store?.data.errors) && _.isArray(store?.data?.errors) && setErrors) {
        setErrors(store?.data?.errors);
      }

      /* conditionally render notifiers and page refresh */
      switch (history.location.pathname) {
      case '/home':
        break;
      case '/explore':
        notifier({
          title: 'Error Occurred',
          text: store?.data?.message || store?.data,
          type: 'error'
        });
        break;

      default:
        if (!path('/login') && !path('/register')) {
          refresh();
        }
        return notifier({
          title: 'Error Occurred',
          text: store?.data?.message,
          type: 'error'
        });
      }
    }
    if (store?.status === 'success') {
      if (noData) {
        notifier({
          title: 'No content',
          text: store?.data?.message || 'There is no data to display yet',
          type: 'info'
        });
        // history.goBack();
      }
    }
    return false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store?.status]);
  return (
    <>
      { store
        ? (
          <div>
            {
              store?.status === 'initial' && initial
            }
            {
              (store?.status === 'pending' || isPending) && <div className="min-w-300-w"><Loader /></div>
            }
            {
              store?.status === 'success' && view
            }
            {
              store?.status === 'success' && (_.isEmpty(store?.data?.data) || noData) && redirect && <NoData1 redirect={redirect} />
            }
            {
              store?.status === 'failed' && retry && (
                <div className="content">
                  <div className="theme-font mr-3">
                    <p className="font-title text-danger">
                      Failed to load content.
                    </p>
                  </div>
                  <button className="btn" type="button" onClick={retry}>Try again</button>
                  <div className="row">
                    <small className="text-theme-sub wrap">
                      The network resources failed to connect.
                      Click on the Try Again button above to retry loading this content.
                    </small>
                  </div>
                </div>
              )
            }
          </div>
        )
        : view}
    </>
  );
};
export default PageTemp;
