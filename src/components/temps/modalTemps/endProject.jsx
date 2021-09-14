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
  const store = useSelector((state) => state.project?.stopProject);

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
      <div className="row  align-content-center">
        <p className="text-warning bold py-3 row">
          Are You Sure You Want To End This Project Now?
        </p>
        <hr />
        <div className="row justify-content-center ">
          <button className="btn-plain border-wema text-warning mr-4  w-25 btn-small" type="button" onClick={takeAction}>Yes</button>
          <button className="btn-plain text-wema border-wema w-25 btn-small" type="button" onClick={handleClose}>No</button>
        </div>
      </div>
    </div>
  );
  const successTemp = (
    <div className="row justify-content-center">
      <p className="text-success">
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
