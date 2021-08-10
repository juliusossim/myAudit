import React, {
  useEffect, useState, lazy, useCallback
} from 'react';
import _ from 'lodash';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useDispatch, useSelector } from 'react-redux';
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
import MediaSlider from '../../../components/microComponents/mediaSlider';

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
  const [media, setMedia] = useState([]);
  const [accordionTab, setAccordionTab] = useState(tab || 1);
  const [slideClss, setSlideClss] = useState('');
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
      setMedia(store.projectDetails?.data?.data?.media);
      setActiveMedia(store.projectDetails?.data?.data?.media[0]);
    }
  }, [store.projectDetails?.status]);

  useEffect(() => {
    if (store.similarProjects?.status === 'success') {
      setSimilar([...store.similarProjects?.data?.data]);
    }
  }, [store.similarProjects.status]);

  const reOrderMedia = (nexActive) => {
    const temp = media.filter((item) => item !== nexActive);
    temp.push(nexActive);
    console.log(temp);
    setMedia(temp);
  };

  const handleSelectSlide = (back) => {
    const activeIndex = _.findLastIndex(media, (item) => item === activeMedia);
    if (back) {
      setSlideClss('slide-right');
      if (activeIndex === 0) {
        const nexActive = _.last(media);
        setActiveMedia(nexActive);
        reOrderMedia(nexActive);
      } else {
        const nexActive = media[activeIndex - 1];
        setActiveMedia(nexActive);
        reOrderMedia(nexActive);
      }
    } else if (activeIndex === (project?.media?.length - 1)) {
      setSlideClss('slide-left');
      const nexActive = _.head(media);
      setActiveMedia(nexActive);
      reOrderMedia(nexActive);
    } else {
      setSlideClss('slide-left');
      const nexActive = media[activeIndex + 1];
      setActiveMedia(nexActive);
      reOrderMedia(nexActive);
    }
  };

  // const slideLeft = ()
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
                <LazyImage cls="h-400" src={activeMedia?.uri || Kat} alt="kat" />
              </CardMedia>
              <div className="d-flex mt-lg-3">
                <div className="d-flex">
                  <button type="button" className="border-radius-50 btn-small btn-plain text-wema  hover-wema bg-wema-light h-50 mt-3">
                    <IoArrowBackCircleOutline className="" onClick={() => handleSelectSlide(true)} />
                  </button>
                  <button type="button" className="border-radius-50 btn-small btn-plain text-wema  hover-wema bg-wema-light top-neg-7 ml-2 h-50 mt-4">
                    <IoArrowForwardCircleOutline onClick={() => handleSelectSlide(false)} />
                  </button>
                </div>
                <div className="d-md-flex d-none w-600 pl-5 overflow-x-hidden h-50">
                  <MediaSlider
                    mediaFiles={media}
                    selected={activeMedia}
                    slideClass={slideClss}
                    setSelected={setActiveMedia}
                  />
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
                      <div className="progress mt-3 mb-3" title={`#${(project.donationTarget - project?.amountRaised).toLocaleString()} to hit target`}>
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
                              typeof ((project.amountRaised / project.donationTarget) * 100)
                                .toFixed(0) === 'number'
                                ? (
                                  <span>
                                    {
                                      ((project.amountRaised / project.donationTarget) * 100)
                                        .toFixed(0)
                                    }
                                  </span>
                                )
                                : (
                                  <span>
                                    0
                                  </span>
                                )
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
              similar.map(
                (tem, key) => (
                  <div key={`project ${tem.id}`} className="col-md-3 mt-5">
                    <Card className="ml-2">
                      <CardContent>
                        <div>
                          <LazyImage src={tem.media} alt={tem.title} />
                        </div>
                        <h3>
                          {tem.title}
                        </h3>
                        <small>
                          <span>{tem.lga}</span>
                          <span className="ml-1">{tem.state}</span>
                        </small>
                        <div>
                          {tem.summary}
                        </div>
                        <span className="pr-1 raised">
                          <span>&#8358;</span>
                          {tem.amountRaised?.toLocaleString() || 0}
                        </span>
                        <span>
                          raised of
                          <span className="ml-1">&#8358;</span>
                          {tem.donationTarget?.toLocaleString() || 0}
                        </span>
                        <div className="progress mt-3 mb-3" title={`#${(tem.donationTarget - tem?.amountRaised).toLocaleString() || 0} to hit target`}>
                          <div
                            className="progress-bar bg-wema"
                            role="progressbar"
                            aria-valuenow={
                              (tem.amountRaised / tem.donationTarget) * 100
                            }
                            style={{ width: `${(tem.amountRaised / tem.donationTarget) * 100}%` }}
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
                            {tem.creator?.fullName}
                          </p>
                        </div>
                        <div className="d-flex">
                          <div className="">
                            <span>Fund Percent:</span>
                            <span className="bold ml-2">
                              {
                                typeof ((tem.amountRaised / tem.donationTarget) * 100)
                                  .toFixed(0) === 'number'
                                  ? (
                                    <span>
                                      {
                                        ((tem.amountRaised / tem.donationTarget) * 100)
                                          .toFixed(0)
                                      }
                                    </span>
                                  )
                                  : (
                                    <span>
                                      0
                                    </span>
                                  )
                              }
                              %
                            </span>
                          </div>
                          <div className="pl-2">
                            {
                              `Due ${positiveDiffs(new Date(tem.endDate))}`
                            }
                          </div>
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
