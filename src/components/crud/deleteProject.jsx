import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectAction } from '../../redux/actions/projectActions';
import { apiOptions } from '../../services/fetch';
import BackdropModal from '../microComponents/backdropModal';
import DeleteEndProjectTemp from '../temps/modalTemps/endProject';

/**
 * @param project {object}: the project object | collection
 * @param dispatch {useDispatch}
 * action must be equivalent to the endpoint index
 * @param open {boolean}
 * @param handleClose {function}
 * @return useDispatch
 */
const DeleteProject = ({
  project, open, handleClose
}) => {
  /* Redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project);
  /* state */
  const [snackOpen, setSnackOpen] = useState(false);

  const { projectId, amountRaised } = project;
  const action = (amountRaised === null || parseFloat(amountRaised) === 0) ? 'DELETE_PROJECT' : 'STOP_PROJECT';
  const method = action === 'STOP_PROJECT' ? 'post' : 'del';
  const status = method === 'post' ? store?.stopProject?.status : store?.deleteProject?.status;
  useEffect(() => {
    if (status === 'success') {
      setSnackOpen(true);
    }
  }, [status]);
  const takeAction = useCallback(() => dispatch(projectAction(
    {
      action,
      routeOptions: apiOptions({
        method,
        param: projectId,
        endpoint: action,
        auth: true,
        afterParam: method === 'post' && 'end'
      })
    }
  )), []);
  return (
    <BackdropModal
      content={<DeleteProjectTemp status={status} action={takeAction} end={method === 'post'} handleClose={handleClose} open={snackOpen} setOpen={setSnackOpen} />}
      handleClose={handleClose}
      open={open}
    />
  );
};
export default DeleteProject;
