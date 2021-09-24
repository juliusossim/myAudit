import React, {
  useCallback, useEffect, useMemo,
  useState
} from 'react';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import SvgIcon from '@material-ui/core/SvgIcon';
import CommentsLogo from '../../../assets/images/comment.svg';
import { apiOptions } from '../../../services/fetch';
import Loader from '../../../components/microComponents/loader';
import PageTemp from '../../../components/temps/PageTemp';
import { sentenceCaps, stringDoesNotExist } from '../../../utilities/stringOperations';
import { positiveDiffs } from '../../../utilities/dateOperations';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Donors = ({
  projectId
}) => {
  /* redux */
  const store = useSelector((state) => state.project?.commentsDonors);
  const naira = process.env.REACT_APP_NAIRA;

  const CommentIcon = (props) => (
    <SvgIcon>
      <path d="M13 25.1562V30.3555C13 30.7114 13.2886 31 13.6445 31H26.5352C26.8911 31 27.1797 30.7114 27.1797 30.3555V25.1562C27.1797 21.2232 23.9992 18.0234 20.0898 18.0234C16.1805 18.0234 13 21.2232 13 25.1562ZM20.0898 19.3125C23.2884 19.3125 25.8906 21.934 25.8906 25.1562V29.7109H14.2891V25.1562C14.2891 21.934 16.8913 19.3125 20.0898 19.3125Z" fill="#A01B88" />
      <path d="M24.6016 13.5117C24.6016 11.024 22.5776 9 20.0898 9C17.6021 9 15.5781 11.024 15.5781 13.5117C15.5781 15.9995 17.6021 18.0234 20.0898 18.0234C22.5776 18.0234 24.6016 15.9995 24.6016 13.5117ZM20.0898 16.7344C18.3129 16.7344 16.8672 15.2887 16.8672 13.5117C16.8672 11.7347 18.3129 10.2891 20.0898 10.2891C21.8668 10.2891 23.3125 11.7347 23.3125 13.5117C23.3125 15.2887 21.8668 16.7344 20.0898 16.7344Z" fill="#A01B88" />
    </SvgIcon>
  );
  const successView = (
    <div>
      {
        store?.data?.data?.length > 0 && (
          store?.data?.data?.map((item) => item.amount !== undefined && (
            <div className="d-flex border bg-light my-3 p-3" key={item.dateCreated}>
              <div>
                <img src={CommentsLogo} alt="comments" />
              </div>
              <div className="ml-2 row justify-content-between">
                <p>
                  <p className="bold">
                    {stringDoesNotExist(item.customerName) ? 'Anonymous' : sentenceCaps(item.customerName)}
                  </p>
                  <span>
                    {
                      format(new Date(item.dateCreated), 'dd/MM/yyyy')
                    }
                  </span>
                </p>
                <p className="pr-3">
                  <span>
                    donated
                  </span>
                  <p className="bold">
                    <span>&#8358;</span>
                    {item.amount}
                  </p>
                </p>
              </div>
            </div>
          ))
        )
      }
    </div>
  );

  return (
    <div className="pr-5 mt-3">
      <PageTemp
        status={store?.status}
        noData={store?.data?.data?.length === 0}
        view={successView}
      />
    </div>
  );
};
export default Donors;
