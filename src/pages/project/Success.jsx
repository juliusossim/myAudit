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
  <div className="content">
    <div className="max-w-600 w-600 margin-center m-t-40 h-80h scroll-y neg-m-b-60">
      <div className="login-form-container p-20 bg-light">
        <div className="login-form pb-5h">
          <h1 className="">Success</h1>
          <hr className="border-wema" />
          <div className="text-wema my-4">
            Your Project is Sent, An admin will review your request accordingly
          </div>
          <Link to="/create-project/1/0">
            <button type="button" className="btn btn-small">
              Start Another Project
            </button>
          </Link>
          <div className="text-center ml-2 w-25 btn-small btn">
            <Link to="/me" className="text-white">
              My Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Success;
