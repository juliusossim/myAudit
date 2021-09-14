import React, { useCallback, useEffect } from 'react';
import {
  AiOutlineCloseCircle, GoMail, IoLogoWhatsapp, SiTwitter, GrFacebook, FaLinkedin, ImTelegram
} from 'react-icons/all';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import PageTemp from '../PageTemp';
import { projectAction } from '../../../redux/actions/projectActions';
import { apiOptions } from '../../../services/fetch';

const DeleteProjectTemp = ({
  handleClose, project, setData, data
}) => {
  /* Redux */
  const store = useSelector((state) => state.project?.deleteProject);

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
      action: 'DELETE_PROJECT',
      routeOptions: apiOptions({
        method: 'del',
        param: projectId,
        endpoint: 'DELETE_PROJECT',
        auth: true
      })
    }
  ));

  const initTemp = (
    <div>
      <div className="row  align-content-center">
        <p className="text-danger bold py-3 row">
          Are You Sure You Want To Delete This Project Now?
        </p>
        <hr />
        <div className="row justify-content-center ">
          <button className="btn-plain border-wema text-danger mr-4  w-25 btn-small" type="button" onClick={takeAction}>Yes</button>
          <button className="btn-plain text-wema border-wema w-25 btn-small" type="button" onClick={handleClose}>No</button>
        </div>
      </div>
    </div>
  );
  const successTemp = (
    <div className="row justify-content-center">
      <div className="">
        <p className="text-wema bold font-1-5">
          Projected successfully deleted.
        </p>
      </div>
      <div className="row justify-content-center">
        <p className="">
          Your project is deleted and no more on the platform.
        </p>
      </div>
      <div className="row justify-content-center">
        <button className="btn-plain text-wema border-wema w-25 btn-small" type="button" onClick={handleClose}>Ok</button>
      </div>
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
export default DeleteProjectTemp;
