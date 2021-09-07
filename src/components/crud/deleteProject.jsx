import React from 'react';
import { projectAction } from '../../redux/actions/projectActions';
import { apiOptions } from '../../services/fetch';

/**
 * @param project {object}: the project object | collection
 * @param dispatch {useDispatch}
 * action must be equivalent to the endpoint index
 * @return useDispatch
 */
const deleteProject = ({ project, dispatch }) => {
  const { projectId, amountRaised } = project;
  const action = (amountRaised === null || parseFloat(amountRaised) === 0) ? 'DELETE_PROJECT' : 'STOP_PROJECT';
  return dispatch(projectAction(
    {
      action,
      routeOptions: apiOptions({
        method: 'del',
        param: projectId,
        endpoint: action,
        auth: true
      })
    }
  ));
};
export default deleteProject;
