import React, {
  useEffect, useState, lazy
} from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import NaijaStates from 'naija-state-local-government';
import { useLocation, useParams } from 'react-router-dom';
import { FaArrowDown, FaArrowUp } from 'react-icons/all';
import {
  projectAction,
  projectCategories
} from '../../redux/actions/projectActions';
import CollapsedBreadcrumbs from '../../layouts/Breadcrumb';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const CreateProject = () => {
  const { tab, id } = useParams();
  /* redux */
  const dispatch = useDispatch();

  /* state */
  const [formData, setFormData] = useState({ id });
  const [bread, setBread] = useState(null);
  const [accordionTab, setAccordionTab] = useState(parseInt(tab, 10) || 0);

  // useEffect(() => {
  //   dispatch(projectCategories());
  // }, []);

  const Init = lazy(() => import('./Init'));
  const Project1 = lazy(() => import('./Project1'));
  const Project2 = lazy(() => import('./Project2'));
  const Project3 = lazy(() => import('./Project3'));
  const Success = lazy(() => import('./Success'));

  const goBack = () => {
    setAccordionTab(1);
    setFormData({ ...formData, from: 2 });
  };

  const displayProject = () => {
    switch (accordionTab) {
    case 1:
      return (
        <Project1
          setAccordionTab={setAccordionTab}
          data={formData}
          setData={setFormData}
        />
      );
    case 2:
      return (
        <Project2
          setAccordionTab={setAccordionTab}
          data={formData}
          setBread={setBread}
          setData={setFormData}
        />
      );
    case 3:
      return (
        <Project3
          setAccordionTab={setAccordionTab}
          data={{ id: formData.id }}
        />
      );
    case 4:
      return <Success />;
    default:
      return <Init setAccordionTab={setAccordionTab} setData={setFormData} />;
    }
  };

  return (
    <div className="content">
      <div className="row">
        {
          accordionTab === 0
          && (
            <CollapsedBreadcrumbs max={2} current="Initialize project" />
          )
        }
        {
          accordionTab === 1
          && (
            <CollapsedBreadcrumbs max={2} current="Project information" />
          )
        }
        {
          accordionTab === 2
          && (
            <CollapsedBreadcrumbs
              max={2}
              current="Project location"
            />
          )
        }
      </div>
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20 bg-light">
          <h3 className="font-bold text-center text-dark border-bottom border-top-0  ">
            { tab === undefined
              ? formData.title || 'Start a project'
              : 'Edit Project'}
          </h3>
          {
            accordionTab !== 4 && tab === undefined && (
              <div className="row">
                <div className={`col-4 accordion-div  ${accordionTab === 1 && 'is-focus'}`}>
                  <IconButton type="button" onClick={() => setAccordionTab(1)}>
                    <div className={`radius50 w-2e h-2e center-items ${accordionTab === 1 ? 'border-wema' : 'faint-border'}`}>

                      <Avatar
                        className={
                          accordionTab === 1 ? 'styled-mui' : 'text-muted'
                        }
                      >
                        1
                      </Avatar>
                    </div>
                  </IconButton>
                </div>
                <div className={`col-4 accordion-div  ${accordionTab === 2 && 'is-focus'}`}>
                  <IconButton
                    disabled={!(formData.summary?.length > 0
                      && formData.donationTarget)}
                    type="button"
                    onClick={() => setAccordionTab(2)}
                  >
                    <div className={`radius50 w-2e h-2e center-items ${accordionTab === 2 ? 'border-wema' : 'faint-border'}`}>

                      <Avatar
                        className={
                          accordionTab === 2 ? 'styled-mui' : 'text-muted'
                        }
                      >
                        2
                      </Avatar>
                    </div>
                  </IconButton>
                </div>
              </div>
            )
          }

          {
            displayProject()
          }

        </div>
      </div>
    </div>
  );
};

export default CreateProject;
