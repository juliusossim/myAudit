import React, {
  useEffect, useState, lazy, useCallback
} from 'react';
import {
  useDispatch, useSelector
} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import NaijaStates from 'naija-state-local-government';
import {
  Link, useHistory, useParams
} from 'react-router-dom';
import {
  BiDonateHeart, FaArrowDown, FaArrowUp, FiDelete, FiEdit, FiShare2, RiDeleteBin6Line
} from 'react-icons/all';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import _ from 'lodash';
import CardContent from '@material-ui/core/CardContent';
import WOW from 'wowjs';
import {
  projectAction
} from '../../redux/actions/projectActions';
import CollapsedBreadcrumbs from '../../layouts/Breadcrumb';
import { apiOptions } from '../../services/fetch';
import { greeter, positiveDiffs } from '../../utilities/dateOperations';
import { user } from '../../utilities/auth';
import Kat from '../../assets/images/kat-yukawa-K0E6E0a0R3A-unsplash 1.svg';
import LazyImage from '../../components/microComponents/lazyImg';
import BackdropModal from '../../components/microComponents/backdropModal';
import DeleteProjectTemp from '../../components/temps/modalTemps/deleteProject';
import { notifier } from '../../utilities/stringOperations';
import Loader from '../../components/microComponents/loader';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const CreateProject = () => {
  const { tab, id } = useParams();
  const history = useHistory();
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project?.projectByStatus);

  /* state */
  const [formData, setFormData] = useState([]);
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [accordionTab, setAccordionTab] = useState(parseInt(tab, 10) || 0);

  const updateData = () => {
    const newData = formData.filter((item) => item.id !== project.id);
    console.log(formData.length);
    setFormData([...newData]);
  };
  const handleClose = () => setOpen(false);

  const getProjectByStatus = useCallback((status) => {
    dispatch(projectAction(
      {
        action: 'PROJECT_BY_STATUS',
        routeOptions: apiOptions({
          method: 'get',
          param: '0',
          endpoint: 'PROJECT_BY_STATUS',
          auth: true
        })
      }
    ));
  }, [tab]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (store.status === 'initial') {
      getProjectByStatus(0);
    }
    if (store.status === 'success') {
      new WOW.WOW({
        live: true,
        offset: 100
      }).init();
      if (store.data?.data?.length < 1) {
        history.push('/project/init');
      }
      setFormData([
        ...store.data.data
      ]);
    }
    if (store.status === 'failed') {
      notifier({
        title: 'error',
        type: 'error',
        text: store.data || store.medssage || 'we could not retrieve any draft information'
      });
    }
  }, [store.status]);

  return (
    <div className="content">
      <div className="row">
        <CollapsedBreadcrumbs max={2} current="Create project" />
      </div>
      <div className="w-100 m-t-40">
        {
          store.status === 'pending'
            ? <Loader />
            : (
              <div className="">
                <h3 className="font-bold text-dark">
                  <span>
                    {
                      greeter(new Date())
                    }
                  </span>
                  <span className="ml-2 text-wema">
                    {
                      user?.first_name
                    }
                  </span>
                </h3>
                <div className="row">
                  {
                    formData.length > 0
                    && (
                      <div className="">
                        <div className="d-flex justify-content-between px-1">
                          <div>
                            <p>
                              <span className="">You have</span>
                              <span className="text-wema mx-2">{formData.length}</span>
                              <span className="">draft projects. You can continue below</span>
                            </p>
                          </div>
                          <div className="float-right">
                            <Link to="/project/init" type="button" className="btn-small btn">
                              Start a new project
                            </Link>
                          </div>
                        </div>
                        <div className="row">
                          {
                            formData.map((item) => (
                              <div className="col-md-3 mb-4 wow fadeInLeft" key={item.id}>
                                <Paper elevation={3} className="h-40h overflow-y-hidden px-md-0 px-3">
                                  <div>
                                    <CardMedia
                                      className="h-18h"
                                      image={item.primaryMedia?.uri || Kat}
                                      title={item.title}
                                    />
                                  </div>
                                  <CardContent>
                                    <div>
                                      <Link to={{ pathname: `/project/details/${item.projectId}/1`, tab: 1, id: item.projectId }}>
                                        <h3>
                                          {item.title}
                                        </h3>
                                      </Link>
                                      <div className="">
                                        <span>Target</span>
                                        <span className="bold ml-1">&#8358;</span>
                                        <span className="bold">{item.donationTarget?.toLocaleString() || 0}</span>
                                      </div>
                                      <p>
                                        {item.summary}
                                      </p>
                                      <div className="d-flex justify-content-between mb-2" style={{ position: 'absolute', bottom: '0' }}>
                                        <div>
                                          <Link to={{ pathname: `/review/project/${item.id}` }}>
                                            <button type="button" className=" btn-edit text-edit">
                                              <FiEdit className="mt-1 mr-1" />
                                              Continue
                                            </button>
                                          </Link>
                                        </div>
                                        <div className="ml-2">
                                          <button
                                            type="button"
                                            className="btn-delete text-danger"
                                            onClick={() => {
                                              setProject(item);
                                              setOpen(true);
                                            }}
                                          >
                                            <FiDelete className="mt-1 mr-1" />
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Paper>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            )
        }
        <BackdropModal
          content={(
            <DeleteProjectTemp
              updateData={updateData}
              project={project}
              handleClose={handleClose}
            />
          )}
          handleClose={handleClose}
          open={open}
        />
      </div>
    </div>
  );
};

export default CreateProject;
