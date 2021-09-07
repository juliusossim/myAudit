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

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const ProjectDetails = (project) => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project);

  /* state */

  const projectDetails = useCallback((theId) => {
    dispatch(projectAction(
      {
        action: 'PROJECT_DETAILS',
        routeOptions: apiOptions({
          method: 'get',
          param: theId,
          endpoint: 'PROJECT_DETAILS',
          auth: true,
          afterParam: 'details'
        })
      }
    ));
  }, []);

  return (
    <div className="content">
      <div className="w-100 margin-center m-t-40">
        <div className="p-20 bg-light">
          <div className="d-md-flex ">
            <div className=" max-w-750">
              <CardMedia className="">
                <LazyImage cls="h-400" src={project?.media[0]?.uri || Kat} alt="kat" />
              </CardMedia>
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
