import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isAfter from 'date-fns/isAfter';
import { FiEdit, RiDeleteBin6Line } from 'react-icons/all';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import { myProjects } from '../../redux/actions/profileActions';
import LazyImage from '../../components/microComponents/lazyImg';
import { stringCaps } from '../../utilities/stringOperations';
import Loader from '../../components/microComponents/loader';
import { approvalStatus, approvalColors } from '../../utilities/dummyData';
import { positiveDiffs } from '../../utilities/dateOperations';
import BackdropModal from '../../components/microComponents/backdropModal';
import DeleteProjectTemp from '../../components/temps/modalTemps/deleteProject';
import EndProjectTemp from '../../components/temps/modalTemps/endProject';
import PageTemp from '../../components/temps/PageTemp';

const Projects = ({ setCurrent }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const [formData, setFormData] = useState([]);
  const [showView, setShowView] = useState(false);
  const [open, setOpen] = useState(false);
  const [theProject, setTheProject] = useState({});

  const handleClose = () => setOpen(false);
  const isDelete = (project) => (
    project?.amountRaised === null || parseFloat(project?.amountRaised) === 0
  );
  const template = (project) => ((
    project?.amountRaised === null || parseFloat(project?.amountRaised) === 0
  )
    ? (
      <DeleteProjectTemp
        setData={setFormData}
        data={formData}
        project={project}
        handleClose={handleClose}
      />
    )
    : (
      <EndProjectTemp
        setData={setFormData}
        data={formData}
        project={project}
        handleClose={handleClose}
      />
    ));
  const getUser = () => {
    dispatch(myProjects());
  };
  // const refreshUser = setUser(store.data);
  const handleFormUpdate = (data) => {
    setFormData([...data]);
    setShowView(true);
  };
  const handleDelete = (data) => {
    const newData = formData.filter((item) => (
      item.projectId !== data.projectId
    ));
    setFormData([...newData]);
  };

  useEffect(() => {
    if (store.profile?.projects?.status === 'success'
    && store.profile?.projects?.data?.data?.length > 0) {
      setFormData([...store.profile?.projects?.data.data]);
      setShowView(true);
    }
    if (store.project?.deleteProject?.status === 'success'
    && store.profile?.projects?.data?.data?.length > 0) {
      const newData = formData.filter(
        (item) => item.id !== store.project?.deleteProject?.data?.data?.projectId
      );
      setFormData([...newData]);
      setShowView(true);
    }
  }, [store.profile?.projects?.status]);
  useEffect(() => {
    if (store.project?.deleteProject?.status === 'success'
    && store.profile?.projects?.data?.data?.length > 0) {
      const newData = formData.filter(
        (item) => item.projectId !== store.project?.deleteProject?.data?.data?.id
      );
      setFormData([...newData]);
      setShowView(true);
    }
  }, [store.project?.deleteProject?.status]);

  useEffect(() => {
    setCurrent('My projects');
    dispatch(myProjects());
  }, []);

  const successTemp = (
    <div className="login-form pb-5h">
      <div>
        {
          formData.map(
            (item, key) => (
              <div key={Math.random()}>
                <div key={`project ${item.id}`} className="row mt-5">
                  <div className="col-md-5">
                    <LazyImage src={item.primaryMedia?.uri} alt={item.title} />
                  </div>
                  <div className="col-md-5 mb-5">
                    <Link to={{ pathname: `/project/details/${item.projectId}/1`, tab: 1, id: item.projectId }}>
                      <h3>
                        {item.title}
                        <Chip
                          color={
                            approvalColors[approvalStatus[item.approvalStatus]]
                          }
                          label={stringCaps(approvalStatus[item.approvalStatus])}
                        />
                      </h3>
                      <small className={item.state.length > 1 ? '' : 'd-none'}>
                        <span className="pr-1">{`${item.lga},`}</span>
                        <span>{item.state || ''}</span>
                      </small>
                    </Link>
                    <div className="col-md-5 mt-5">
                      <div className="d-flex">
                        <div className="mr-5">
                          Donors
                          <p className="bold">{item.donors || 'None'}</p>
                        </div>
                        <div>
                          Shares
                          <p className="bold">{item.shares || 0}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-5 mb-2">
                      <div className="pr-1 raised col-md-6">
                        <span className="bold mr-1">{`N${item.amountRaised?.toLocaleString() || 0}`}</span>
                        raised
                      </div>
                      <div className="col-md-6 ">
                        <span>Target</span>
                        <span className="bold">{` N${item.donationTarget?.toLocaleString() || 0}`}</span>
                      </div>
                    </div>
                    <div className="progress mt-2 mb-3" title={`N${(item.donationTarget - item.amountRaised || 0).toLocaleString()} to hit target`}>
                      <div
                        className="progress-bar bg-wema"
                        role="progressbar"
                        aria-valuenow={
                          (item.amountRaised / item.donationTarget) * 100
                        }
                        style={{ width: `${(item.amountRaised / item.donationTarget) * 100}%` }}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-labelledby="progress_bar"
                      />
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <span>Fund Percent:</span>
                        <span className="bold ml-2">
                          {
                            ((item.amountRaised / item.donationTarget) * 100)
                              .toFixed(0) || 0
                          }
                          %
                        </span>
                      </div>
                      <div className="col-md-6">
                        {
                          `Due ${positiveDiffs(new Date(item.endDate))}`
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <Link to={{ pathname: `/review/project/${item.projectId}` }}>
                      <button type="button" className=" btn-edit text-edit w-100">
                        <FiEdit className="mt-1 mr-1" />
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setOpen(true);
                        setTheProject(item);
                      }}
                      type="button"
                      className="btn-sm btn-delete text-delete w-100 mt-5"
                    >
                      <RiDeleteBin6Line className="mt-1 mr-1" />
                      {isDelete(item) ? 'Delete' : 'End'}
                    </button>
                    <div className="m-t-40 pt-5">
                      <button type="button" disabled={isAfter(new Date(item.endDate), new Date())} className="btn mt-5">
                        Withdraw funds
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            )
          )
        }
      </div>
    </div>
  );

  return (
    <div>
      {
        showView
            && (
              <div className="w-100 margin-center m-t-40 ">
                <div className="login-form-container p-20">
                  <PageTemp
                    status={store.profile?.projects?.status}
                    view={successTemp}
                    noData={formData.length === 0}
                  />
                </div>
                <BackdropModal
                  content={template(theProject)}
                  handleClose={handleClose}
                  open={open}
                />
              </div>
            )
      }
    </div>

  );
};
export default Projects;
