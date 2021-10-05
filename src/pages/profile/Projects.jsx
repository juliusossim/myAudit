import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isAfter from 'date-fns/isAfter';
import {
  FiEdit, RiDeleteBin6Line, IoCheckmarkOutline,
  FaDraft2Digital, BsEyeSlash, MdSentimentVeryDissatisfied, IoPauseCircleOutline, RiDraftLine
} from 'react-icons/all';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import {
  Slide, Zoom
} from 'react-reveal';
import { myProjects } from '../../redux/actions/profileActions';
import LazyImage from '../../components/microComponents/lazyImg';
import { notifier, stringCaps } from '../../utilities/stringOperations';
import { approvalColors } from '../../utilities/dummyData';
import { positiveDiffs } from '../../utilities/dateOperations';
import BackdropModal from '../../components/microComponents/backdropModal';
import DeleteProjectTemp from '../../components/temps/modalTemps/deleteProject';
import EndProjectTemp from '../../components/temps/modalTemps/endProject';
import PageTemp from '../../components/temps/PageTemp';
import ProjectProgress from '../../components/temps/projectTemps/projectProgress';
import Kat from '../../assets/images/kat-yukawa-K0E6E0a0R3A-unsplash 1.svg';

const Projects = ({ setCurrent }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const [formData, setFormData] = useState([]);
  const [showView, setShowView] = useState(false);
  const [open, setOpen] = useState(false);
  const [theProject, setTheProject] = useState({});
  const approvalStatus = [
    {
      name: 'pending',
      icon: <BsEyeSlash />
    },
    {
      name: 'approved',
      icon: <IoCheckmarkOutline />
    },
    {
      name: 'rejected',
      icon: <MdSentimentVeryDissatisfied />
    },
    {
      name: 'returned',
      icon: <IoCheckmarkOutline />
    },
    {
      name: 'paused',
      icon: <IoPauseCircleOutline />
    },
    {
      name: 'deleted',
      icon: <IoPauseCircleOutline />
    },
    {
      name: 'draft',
      icon: <RiDraftLine />
    }
  ];

  const handleClose = () => setOpen(false);
  const isDelete = (project) => (
    project?.amountRaised === null || parseFloat(project?.amountRaised) === 0
  );
  const updateData = () => {
    const newData = formData.filter((item) => item.projectId !== theProject.projectId);
    setFormData([...newData]);
  };
  const template = (project) => ((
    project?.amountRaised === null || parseFloat(project?.amountRaised) === 0
  )
    ? (
      <DeleteProjectTemp
        updateData={updateData}
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
    if (store.profile?.projects?.status === 'initial') {
      setCurrent('My projects');
      dispatch(myProjects());
    }
    if (store.profile?.projects?.status === 'success'
    && store.profile?.projects?.data?.data?.length > 0) {
      setFormData([...store.profile?.projects?.data.data]);
      setShowView(true);
    }
    if (store.profile?.projects?.status === 'failed') {
      notifier({
        title: 'error',
        type: 'error',
        text: store.profile?.projects?.data
          || store.profile?.projects?.data?.message
          || 'could not load your projects'
      });
    }
  }, [store.profile?.projects?.status]);

  const successTemp = (data) => (
    <div className="login-form-container p-20">
      <div className="login-form pb-5h">
        <div>
          {
            data.map(
              (item, key) => (
                <div key={Math.random()}>
                  <div key={`project ${item.id}`} className="row mt-md-5">
                    <div className="col-md-5">
                      <Slide left>
                        <LazyImage src={item.primaryMedia?.uri} alt={item.title} />
                      </Slide>
                    </div>
                    <div className="col-md-5 mb-md-5">
                      {
                        item.approvalStatus === 1
                          ? (
                            <Link to={{ pathname: `/project/details/${item.projectId}/1`, tab: 1, id: item.projectId }} title={approvalStatus[item.approvalStatus].name}>
                              <h3>
                                {item.title}
                                <span
                                  className={`text-${approvalColors[approvalStatus[item.approvalStatus].name]}`}
                                >
                                  {approvalStatus[item.approvalStatus].icon}
                                </span>
                              </h3>
                              <small className={item.state.length > 1 ? '' : 'd-none'}>
                                <span className="pr-1">{`${item.lga},`}</span>
                                <span>{item.state || ''}</span>
                              </small>
                            </Link>

                          )
                          : (
                            <div>
                              <h3 title={approvalStatus[item.approvalStatus].name}>
                                {item.title}
                                <span
                                  className={`text-${approvalColors[approvalStatus[item.approvalStatus].name]} font-16`}
                                >
                                  {approvalStatus[item.approvalStatus].icon}
                                </span>
                              </h3>
                              <small className={item.state.length > 1 ? '' : 'd-none'}>
                                <span className="pr-1 fon">{`${item.lga},`}</span>
                                <span>{item.state || ''}</span>
                              </small>
                            </div>

                          )
                      }
                      <div className="col-md-5 mt-md-5 mt-2">
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
                      <div className="d-flex flex-wrap mt-md-5 my-2">
                        <div className="pr-1 raised ">
                          <span className="bold">&#8358;</span>
                          <span className="bold mr-1">{item.amountRaised?.toLocaleString() || 0}</span>
                          raised,
                        </div>
                        <div className=" ">
                          <span>Target</span>
                          <span className="bold ml-1">&#8358;</span>
                          <span className="bold">{item.donationTarget?.toLocaleString() || 0}</span>
                        </div>
                      </div>
                      <ProjectProgress project={item} />
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <span>Fund Percent:</span>
                          <span className="bold ml-2">
                            {
                              !isNaN(item.amountRaised / item.donationTarget)
                                ? ((item.amountRaised / item.donationTarget) * 100)
                                  .toFixed(0)
                                : 0
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
                      <Slide left>
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
                          className={isDelete(item) ? 'btn-sm btn-delete text-delete w-100 mt-5' : 'btn-sm btn-edit text-edit w-100 mt-5'}
                        >
                          <RiDeleteBin6Line className="mt-1 mr-1" />
                          {isDelete(item) ? 'Delete' : 'End'}
                        </button>
                        <div className="m-t-40 pt-5">
                          <button type="button" disabled={isAfter(new Date(item.endDate), new Date())} className={parseFloat(item.amountRaised) === 0 ? 'd-none' : 'btn mt-5'}>
                            Withdraw funds
                          </button>
                        </div>
                      </Slide>

                    </div>
                  </div>
                  <hr />
                </div>
              )
            )
          }
        </div>
      </div>
    </div>
  );

  return (
    <div>

      <div className="w-100 margin-center m-t-40 ">

        <PageTemp
          status={store.profile?.projects?.status}
          view={successTemp(formData)}
          noData={formData.length === 0}
        />
      </div>
      <BackdropModal
        content={template(theProject)}
        handleClose={handleClose}
        open={open}
      />

    </div>

  );
};
export default Projects;
