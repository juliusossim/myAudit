import React, {
  useEffect, useState, lazy, useCallback, useMemo
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
  IoArrowBackCircleOutline, IoArrowForwardCircleOutline
} from 'react-icons/all';
import {
  projectAction
} from '../../../redux/actions/projectActions';
import LazyImage from '../../../components/microComponents/lazyImg';
import Kat from '../../../assets/images/kat-yukawa-K0E6E0a0R3A-unsplash 1.svg';
import { apiOptions } from '../../../services/fetch';
import MediaSlider from '../../../components/microComponents/mediaSlider';
import ProjectInfo from '../../../components/ui/projectInfo';
import NoData from '../../authentication/NoData';

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
  const [accordionTab, setAccordionTab] = useState(1);
  const [slideClss, setSlideClss] = useState('');
  const [activeMedia, setActiveMedia] = useState(null);
  const [collapse, setCollapse] = useState(true);

  useEffect(() => {
    projectDetails(id);
  }, []);

  useEffect(() => {
    if (store.detailsSimilar?.status === 'success') {
      commentDonors();
      setProject({ ...store.detailsSimilar?.data?.data?.project });
      setSimilar([...store.detailsSimilar?.data?.data?.similar]);
      setMedia(store.detailsSimilar?.data?.data?.project?.media);
      setActiveMedia(store.detailsSimilar?.data?.data?.project?.media[0]);
    }
  }, [store.detailsSimilar?.status]);

  const reOrderMedia = (nexActive) => {
    const temp = media.filter((item) => item !== nexActive);
    temp.push(nexActive);
    setMedia(temp);
  };
  const projectDetails = useCallback((theId) => {
    dispatch(projectAction(
      {
        action: 'DETAILS_SIMILAR',
        routeOptions: apiOptions({
          method: 'get',
          param: theId,
          endpoint: 'DETAILS_SIMILAR',
          afterParam: 'detailed'
        })
      }
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const commentDonors = useCallback(() => dispatch(projectAction(
    {
      action: 'COMMENTS_DONORS',
      routeOptions: apiOptions({
        method: 'get',
        param: id,
        afterParam: 'comments',
        endpoint: 'COMMENTS_DONORS'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  )), [id]);

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
  const Comments = lazy(() => import('./Comments'));
  const Donors = lazy(() => import('./Donors'));

  const displayProject = () => {
    switch (accordionTab) {
    case 2:
      return <Comments />;
    case 4:
      return <Donors />;
    default:
      return <Story />;
    }
  };

  return (
    <div className="content">
      <div className="w-100 margin-center m-t-40">
        <div className="p-20 bg-light">
          <div className=" ">
            <div className="">
              <div className="row">
                <div className="col-md-8">
                  <CardMedia
                    className="h-446"
                    image={activeMedia?.uri || Kat}
                    title={project?.title}
                  />
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
                <div className="col-md-4">
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
              {/* <CardMedia className=""> */}
              {/*  <LazyImage cls="h-400" src={activeMedia?.uri || Kat} alt="kat" /> */}
              {/* </CardMedia> */}
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

          {
            !_.isEmpty(similar)
                && (
                  <div className="row projects text-left mt-5 ">
                    <div className="row justify-content-between ml-5 mr-5">
                      <p className="bold">
                        Similar Projects
                      </p>
                      <button type="button" className={similar.length > 3 ? 'text-wema float-right viewMoreBtn' : 'd-none'}>
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
                )

          }
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
