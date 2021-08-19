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
import ProjectInfo from '../../../components/ui/projectInfo';

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
      <div className="w-100 margin-center m-t-40">
        <div className="p-20 bg-light">
          <div className="d-md-flex ">
            <div className=" max-w-750">
              <CardMedia className="">
                <LazyImage cls="h-400" src={activeMedia?.uri || Kat} alt="kat" />
              </CardMedia>
              {
                project?.media?.length > 1
                && (
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
                )
              }
              <hr />
            </div>
            <div className="pl-5">
              <ProjectInfo
                project={project}
                actions={[
                  {
                    text: 'Donate',
                    action: () => console.log('donate')
                  },
                  {
                    text: 'Share',
                    plain: true,
                    action: () => console.log('share')
                  }
                ]}
                logo
                style
                shares
                clss="h-40"
              />
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
                  <div key={`project ${tem.id}`} className="col-md-4 mt-5">
                    <ProjectInfo
                      logo={false}
                      styled={1}
                      project={tem}
                    />
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
