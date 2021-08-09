import React, {
  useEffect, useState, lazy, useCallback
} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { useLocation, useParams } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import {
  FaArrowDown, FaArrowRight, FaArrowUp, IoArrowBackCircleOutline, IoArrowForwardCircleOutline
} from 'react-icons/all';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {
  getProject,
  projectAction,
  projectCategories
} from '../../../redux/actions/projectActions';
import LazyImage from '../../../components/microComponents/lazyImg';
import Kat from '../../../assets/images/kat-yukawa-K0E6E0a0R3A-unsplash 1.svg';
import { approvalStatus, approvalColors, popularProjects } from '../../../utilities/dummyData';
import { getOneName, stringCaps } from '../../../utilities/stringOperations';
import { positiveDiffs } from '../../../utilities/dateOperations';
import { apiOptions } from '../../../services/fetch';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const ProjectDetails = (items) => {
  const { id, tab } = useParams();

  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project);

  /* state */
  const [project, setProject] = useState({});
  const [similar, setSimilar] = useState([]);
  const [accordionTab, setAccordionTab] = useState(tab || 1);
  const [temp1, setTemp1] = useState([]);
  const [temp2, setTemp2] = useState([]);
  const [activeMedia, setActiveMedia] = useState(null);
  const [collapse, setCollapse] = useState(true);

  const retrieveSimilarProjects = useCallback(() => {
    dispatch(projectAction(
      {
        action: 'SIMILAR_PROJECTS',
        routeOptions: apiOptions({
          method: 'get',
          param: id,
          endpoint: 'SIMILAR_PROJECTS',
          auth: true,
          afterParam: 'similar'
        })
      }
    ));
  }, []);

  const projectDetails = useCallback(() => {
    dispatch(projectAction(
      {
        action: 'PROJECT_DETAILS',
        routeOptions: apiOptions({
          method: 'get',
          param: id,
          endpoint: 'PROJECT_DETAILS',
          auth: true,
          afterParam: 'details'
        })
      }
    ));
  }, []);

  useEffect(() => {
    projectDetails();
  }, []);
  useEffect(() => {
    retrieveSimilarProjects();
  }, [project]);

  useEffect(() => {
    if (store.projectDetails?.status === 'success') {
      setProject({ ...store.projectDetails?.data?.data });
    }
  }, [store.projectDetails?.status]);

  useEffect(() => {
    if (store.similarProjects?.status === 'success') {
      setSimilar([...store.similarProjects?.data?.data]);
    }
  }, [store.similarProjects.status]);

  // useEffect(() => {
  //   if (items?.length > 0) {
  //     const favoured = _.head(items);
  //     setActiveMedia(favoured);
  //   }
  // }, []);
  // useEffect(() => {
  //   if (activeMedia !== null) {
  //     const box = _.takeWhile(
  //       (param, key) => key > _.lastIndexOf(items, (proj) => proj === activeMedia)
  //     );
  //     setTemp1(box);
  //   }
  // }, [activeMedia]);

  const Story = lazy(() => import('./Story'));
  const Success = lazy(() => import('../Success'));

  const displayProject = () => {
    switch (accordionTab) {
    case 2:
      return <Success />;
    default:
      return <Story />;
    }
  };

  return (
    <div className="content">
      <div className="w-100 margin-center m-t-40 ">
        <div className={`login-form-container p-20 bg-light ${collapse && 'h-80h scroll-y neg-m-b-60'}`}>
          <div className="row justify-content-between">
            <div className="text-wema">
              {
                collapse
                  ? (
                    <p>
                      Resized to fit device viewport, both page and window scrolling enabled.
                    </p>
                  )
                  : (
                    <p>
                      Full page, normal scroll.
                    </p>
                  )
              }
            </div>
            <div className="float-right">
              <Button onClick={() => setCollapse(!collapse)}>
                {
                  collapse
                    ? (
                      <div className="float-right text-wema">
                        <span>page</span>
                        <FaArrowDown />
                      </div>
                    )
                    : (
                      <div className="float-right text-wema">
                        <span>window</span>
                        <FaArrowUp />
                      </div>
                    )
                }

              </Button>
            </div>
          </div>
          <div className="d-md-flex ">
            <div className=" max-w-750">
              <CardMedia className="">
                <LazyImage cls="h-400" src={Kat} alt="kat" />
              </CardMedia>
              <div className="d-flex mt-lg-3">
                <div className="d-flex">
                  <button type="button" className="border-radius-50 btn-small btn-plain text-wema  hover-wema bg-wema-light h-50 mt-3">
                    <IoArrowBackCircleOutline className="" />
                  </button>
                  <button type="button" className="border-radius-50 btn-small btn-plain text-wema  hover-wema bg-wema-light top-neg-7 ml-2 h-50 mt-4">
                    <IoArrowForwardCircleOutline />
                  </button>
                </div>
                <div className="d-md-flex d-none w-600 pl-5 overflow-x-hidden">
                  <div className="pr-3 mt-2 ">
                    <LazyImage cls="h-50-c hover-wema" src={Kat} alt="kat" />
                  </div>
                  <div className="pr-3 mt-2">
                    <LazyImage cls="h-50-c hover-wema" src={Kat} alt="kat" />
                  </div>
                  <div className="pr-3 mt-2">
                    <LazyImage cls="h-50-c hover-wema" src={Kat} alt="kat" />
                  </div>
                  <div className="pr-3 mt-2">
                    <LazyImage cls="h-50-c hover-wema" src={Kat} alt="kat" />
                  </div>
                  <div className="pr-3 mt-2">
                    <LazyImage cls="h-50-c hover-wema" src={Kat} alt="kat" />
                  </div>
                  <div className="pr-3 mt-2">
                    <LazyImage cls="h-50-c hover-wema" src={Kat} alt="kat" />
                  </div>
                  <div className="pr-3 mt-2">
                    <LazyImage cls="h-50-c hover-wema" src={Kat} alt="kat" />
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <div className="">
              <Paper elevation={3} className="ml-4">
                <div className="mt-3">
                  <CardContent>
                    <div className="">
                      <h3>
                        <span>{project.title}</span>
                        <Chip
                          color={
                            approvalColors[approvalStatus[project.approvalStatus]]
                          }
                          label={stringCaps(approvalStatus[project.approvalStatus])}
                        />
                      </h3>
                      <small>
                        {project.location || 'Anonymous location'}
                      </small>
                      <div className="col-md-5 mt-5">
                        <div className="d-flex">
                          <div className="mr-5">
                            Donors
                            <p className="bold">{project.donors || 'None'}</p>
                          </div>
                          <div>
                            Shares
                            <p className="bold">{project.shares || 0}</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex mt-5 mb-2">
                        <div className="pr-1 raised">
                          <span className="bold mr-1">
                            <span>&#8358;</span>
                            {project.amountRaised?.toLocaleString() || 0}
                          </span>
                          raised
                        </div>
                        <div className="pl-5 ">
                          <span>Target</span>
                          <span className="bold pl-1">
                            <span>&#8358;</span>
                            {project.donationTarget?.toLocaleString() || 0}
                          </span>
                        </div>
                      </div>
                      <div className="progress mt-3 mb-3" title={`#${(project.donationTarget - 8).toLocaleString()} to hit target`}>
                        <div
                          className="progress-bar bg-wema"
                          role="progressbar"
                          aria-valuenow={
                            (project.amountRaised / project.donationTarget) * 100
                          }
                          style={{ width: `${(project.amountRaised / project.donationTarget) * 100}%` }}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          aria-labelledby="progress_bar"
                        />
                      </div>
                      <div className="d-flex mt-4">
                        <div className="">
                          <span>Fund Percent:</span>
                          <span className="bold ml-2">
                            {
                              ((project.amountRaised / project.donationTarget) * 100)
                                .toFixed(0) || 0
                            }
                            %
                          </span>
                        </div>
                        <div className="pl-5">
                          {
                            `Due ${positiveDiffs(new Date(project.endDate))}`
                          }
                        </div>
                      </div>
                    </div>
                    <div className="d-flex mt-5">
                      <button type="button" className="btn w-50 mr-2">Donate</button>
                      <button type="button" className="btn-plain w-50 border-wema hover-wema">Share</button>
                    </div>
                  </CardContent>
                </div>
              </Paper>
            </div>
          </div>
          <div className="max-w-750">
            <div className="row">
              <div className="d-md-flex max-w-600">
                <div className={`  ${accordionTab === 1 && 'is-focus'}`}>
                  <IconButton type="button" onClick={() => setAccordionTab(1)}>
                    <div className=" center-items">
                      Story
                    </div>
                  </IconButton>
                </div>
                <div className={`ml-md-4 ml-1    ${accordionTab === 2 && 'is-focus'}`}>
                  <IconButton type="button" onClick={() => setAccordionTab(2)}>
                    <div className=" center-items">
                      Comment
                      <span>(15)</span>
                    </div>
                  </IconButton>
                </div>
                <div className={`ml-md-4 ml-1    ${accordionTab === 3 && 'is-focus'}`}>
                  <IconButton type="button" onClick={() => setAccordionTab(3)}>
                    <div className=" center-items">
                      Updates
                    </div>
                  </IconButton>
                </div>
                <div className={`ml-md-4 ml-1   ${accordionTab === 4 && 'is-focus'}`}>
                  <IconButton type="button" onClick={() => setAccordionTab(4)}>
                    <div className=" center-items">
                      Donors
                    </div>
                  </IconButton>
                </div>
              </div>
            </div>

            {
              displayProject()
            }
          </div>
          <div className="row projects text-left mt-5 ">
            <div className="row justify-content-between ml-5 mr-5">
              <p className="bold">
                Similar Projects
              </p>
              <button type="button" className="text-wema float-right viewMoreBtn">
                View More &gt;
              </button>
            </div>
            {
              popularProjects.map(
                (tem, key) => (
                  <div key={`project ${tem.id}`} className="col-md-3 mt-5">
                    <Card className="ml-2">
                      <CardContent>
                        <div>
                          <LazyImage src={tem.photo} alt={tem.name} />
                        </div>
                        <h3>
                          {tem.name}
                        </h3>
                        <small>
                          {tem.location}
                        </small>
                        <div>
                          {tem.description}
                        </div>
                        <span className="pr-1 raised">
                          {`N${tem.raised}`}
                        </span>
                        <span>
                          raised of
                          {' '}
                          {`N${tem.target}`}
                        </span>
                        <div className="progress" title={`N${(tem.target - tem.raised)} to hit target`}>
                          <div
                            className="progress-bar bg-wema"
                            role="progressbar"
                            aria-valuenow={(tem.raised / tem.target) * 100}
                            style={{ width: `${(tem.raised / tem.target) * 100}%` }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            aria-labelledby="progress_bar"
                          />
                        </div>
                        <div className="col-6 col-md-4">
                          <p>
                            Posted by:
                          </p>
                          <p className="posted-by">
                            {getOneName(tem.manager_name)}
                          </p>
                        </div>
                        <div className="col-6 col-md-4">
                          <p>
                            Fund %:
                          </p>
                          <p className="posted-by">
                            { `${((tem.raised / tem.target) * 100).toFixed(0)}%` }
                          </p>
                        </div>
                        <div className="col-6 col-md-4">
                          <p>
                            Duration
                          </p>
                          {
                            positiveDiffs(new Date(tem.created_at), tem.duration).diff !== 0
                              ? (
                                <p className={positiveDiffs(new Date(tem.created_at), tem.duration).left ? 'text-wema posted-by' : 'text-danger'}>
                                  {positiveDiffs(new Date(tem.created_at), tem.duration).diff}
                                  <span className="pl-1">
                                    {positiveDiffs(new Date(tem.created_at), tem.duration).left ? 'days left' : 'days due'}
                                  </span>
                                </p>
                              ) : (
                                <p>
                                  due now
                                </p>
                              )
                          }
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
