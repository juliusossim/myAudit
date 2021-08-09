import React, {
  useEffect, useCallback, useState
} from 'react';
import localforage from 'localforage';
import addDays from 'date-fns/addDays';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import NaijaStates from 'naija-state-local-government';
import { Link } from 'react-router-dom';
import FormBuilder from '../../components/form/builders/form';
import { validateField } from '../../utilities/validation';
import { camelToString, notifier, stringDoesNotExist } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';
import { formBuilderProjectsStartProps, title } from './constants/startProject1Props';
import formBuilderProjectsStart2Props from './constants/startProject2Props';
import formBuilderProjectsPreviewProps from './constants/startProject3Props';
import {
  projectCategories, editProject, projectByStatus, submitProject, createProjectName, uploadMedia
} from '../../redux/actions/projectActions';
import { findItem } from '../../utilities/arrayOperations';
import ModalTemplate from '../../components/temps/modalTemps/temp';
import Loader from '../../components/microComponents/loader';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Success = () => (
  <div>
    <h1 className="">Success</h1>
    <hr className="border-wema" />
    <div className="text-wema my-4">
      Your Project is Sent, An admin will review your request
    </div>
    <Link to="/create-project/1/0">
      <button type="button" className="btn btn-small">
        Start Another Project
      </button>
    </Link>
    {/* </div> */}
    <div className="text-center ml-2 w-25 btn-small btn">
      <Link to="/me" className="text-white">
        My Projects
      </Link>
    </div>
  </div>
);
export default Success;
