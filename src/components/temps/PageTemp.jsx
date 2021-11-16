import React, { useEffect } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../microComponents/loader';
import { notifier, stringDoesNotExist } from '../../utilities/stringOperations';
import { resetAction } from '../../redux/actions/projectActions';
import NoData from '../../pages/authentication/NoData';
import useRefresh from '../hooks/useRefresh';
import { noDataSvg } from '../../utilities/dummyData';

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
      if (history.location.pathname !== '/home') {
        return notifier({
          title: 'Error Occurred',
          text: message,
          type: 'error'
        });
      }
    }
    // if (status === 'success') {
    //   if (_.isEmpty(data)) {
    //     notifier({
    //       title: 'No content',
    //       text: message || 'There is no data to display yet',
    //       type: 'info'
    //     });
    //   }
    // }
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
          (status === 'pending' || isPending) && <div className="min-w-300-w center-vertical-2"><Loader /></div>
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
            <div className="content center-vertical-2 text-center">
              <div className="row justify-content-center">
                <div className="">
                  <div>
                    {noDataSvg}
                  </div>
                  <div className="theme-font-bold font-title-small text-theme-black mr-3">
                    Failed To Load Content
                  </div>
                  <div className="">
                    <small className="text-theme-sub wrap">
                      The network resources failed to connect.
                      Click on the button below to retry loading this content.
                    </small>
                  </div>
                  <div className="row justify-content-center">
                    <button className="btn" type="button" onClick={retry}>Try again</button>
                    <Link to="/" className="btn-plain border-bottom">Quit</Link>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>

    </>
  );
};
export default PageTemp;
