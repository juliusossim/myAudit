import React, { useEffect } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import Loader from '../microComponents/loader';
import { notifier, stringDoesNotExist } from '../../utilities/stringOperations';
import { resetAction } from '../../redux/actions/projectActions';
import NoData from '../../pages/authentication/NoData';
import useRefresh from '../hooks/useRefresh';

const PageTemp = ({
  status, data, message, errors, view, setErrors, action, initial, isPending, retry, redirect
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
    if (status === 'failed') {
      /* reset the state to initial; this reloads the
       initial view and allows for fresh api interactions if necessary */
      !stringDoesNotExist(action)
      && dispatch(resetAction({ action }));

      /* push errors to page for mapping agianst form fields or any rendering */
      if (!_.isEmpty(errors) && _.isArray(errors) && setErrors) {
        setErrors(errors);
      }

      /* conditionally render notifiers and page refresh */
      switch (history.location.pathname) {
      case '/home':
        break;
      case '/explore':
        notifier({
          title: 'Error Occurred',
          text: message,
          type: 'error'
        });
        break;

      default:
        if (!path('/login') && !path('/register')) {
          refresh();
        }
        return notifier({
          title: 'Error Occurred',
          text: message,
          type: 'error'
        });
      }
    }
    if (status === 'success') {
      if (!_.isEmpty(data)) {
        notifier({
          title: 'No content',
          text: message || 'There is no data to display yet',
          type: 'info'
        });
      }
    }
    return false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  return (
    <>

      <div>
        {
          status === 'initial' && initial
        }
        {
          (status === 'pending' || isPending) && <div className="min-w-300-w"><Loader /></div>
        }
        {
          status === 'success' && (_.isEmpty(data)) && redirect && (
            <NoData
              link={redirect.link}
              name={redirect.name}
              title={redirect.title}
              text={redirect.text}
              btnName={redirect.btnName}
            />
          )
        }
        {
          status === 'success' && !_.isEmpty(data) && view
        }
        {
          status === 'failed' && retry && (
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

    </>
  );
};
export default PageTemp;
