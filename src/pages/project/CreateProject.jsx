import React, {
  useEffect, useState, lazy
} from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import NaijaStates from 'naija-state-local-government';
import { useLocation } from 'react-router-dom';
import {
  projectAction,
  projectCategories
} from '../../redux/actions/projectActions';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const CreateProject = () => {
  const { tab, id } = useLocation();

  /* redux */
  const dispatch = useDispatch();

  /* state */
  const [formData, setFormData] = useState({ id });
  const [accordionTab, setAccordionTab] = useState(tab || 0);

  useEffect(() => {
    dispatch(projectCategories());
  }, []);

  const Init = lazy(() => import('./Init'));
  const Project1 = lazy(() => import('./Project1'));
  const Project2 = lazy(() => import('./Project2'));
  const Project3 = lazy(() => import('./Project3'));
  const Success = lazy(() => import('./Success'));

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
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20">
          <h3 className="bold text-center text-dark border-bottom border-wema border-right-0 border-top-0  ">
            { tab === undefined
              ? formData.title || 'Start a project'
              : 'Edit Project'}
          </h3>
          {
            accordionTab !== 4 && tab === undefined && (
              <div className="row">
                <div className={`col-md-4 accordion-div  ${accordionTab === 1 && 'is-focus'}`}>
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
                <div className={`col-md-4 accordion-div  ${accordionTab === 2 && 'is-focus'}`}>
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
                <div className={`col-md-4 accordion-div  ${accordionTab === 3 && 'is-focus'}`}>
                  <IconButton type="button" onClick={() => setAccordionTab(3)}>
                    <div className={`radius50 w-2e h-2e center-items ${accordionTab === 3 ? 'border-wema' : 'faint-border d-none'}`}>

                      <Avatar
                        className={
                          accordionTab === 3 ? 'styled-mui' : 'text-muted'
                        }
                      >
                        3
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
