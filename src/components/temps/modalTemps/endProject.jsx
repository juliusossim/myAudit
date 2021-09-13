import React, { useCallback, useEffect } from 'react';
import {
  AiOutlineCloseCircle, GoMail, IoLogoWhatsapp, SiTwitter, GrFacebook, FaLinkedin, ImTelegram
} from 'react-icons/all';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import PageTemp from '../PageTemp';
import { projectAction } from '../../../redux/actions/projectActions';
import { apiOptions } from '../../../services/fetch';

const EndProjectTemp = ({
  handleClose, project, setData, data
}) => {
  /* Redux */
  const store = useSelector((state) => state.project?.endProject);

  useEffect(() => {
    if (store?.status === 'success') {
      const newData = data.filter((item) => item !== project);
      setData(newData);
      setTimeout(() => handleClose, 1000);
    }
  }, [store?.status]);

  const { projectId } = project;
  const dispatch = useDispatch();

  const takeAction = () => dispatch(projectAction(
    {
      action: 'STOP_PROJECT',
      routeOptions: apiOptions({
        method: 'post',
        param: projectId,
        endpoint: 'STOP_PROJECT',
        auth: true,
        afterParam: 'end'
      })
    }
  ));

  const initTemp = (
    <div>
      <div className="d-flex justify-content-between align-content-center">
        <p className="h1 bold py-3">
          Are You Sure You Want To End This Project Now?
        </p>
        <hr />
        <div className="d-flex">
          <button className="btn btn-danger" type="button" onClick={takeAction}>Yes</button>
          <button className="btn btn-plain" type="button" onClick={handleClose}>No</button>
        </div>
      </div>
    </div>
  );
  const successTemp = (
    <div>
      <p className="h3">
        Projected successfully ended.
      </p>
      <p className="text-info">
        Funds will be liquidated to your primary withdrawal account
      </p>
    </div>
  );
  return (
    <div>
      <PageTemp
        status={store?.status}
        initial={initTemp}
        view={
          successTemp
        }
        error="Sorry, Operation Failed! Please try again."
      />
    </div>
  );
};
export default EndProjectTemp;
