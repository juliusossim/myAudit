import React, { useEffect, useState } from 'react';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import isValid from 'date-fns/isValid';
import isAfter from 'date-fns/isAfter';
import { FiEdit, RiDeleteBin6Line } from 'react-icons/all';
import Chip from '@material-ui/core/Chip';
import { myProjects } from '../../redux/actions/profileActions';
import LazyImage from '../../components/microComponents/lazyImg';
import { getOneName, stringCaps } from '../../utilities/stringOperations';
import { diffDays } from '../../utilities/dateOperations';
import Loader from '../../components/microComponents/loader';
import { approvalStatus } from '../../utilities/dummyData';

const Projects = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile.projects);
  const [formData, setFormData] = useState([]);
  const [showView, setShowView] = useState(false);
  const getUser = () => {
    dispatch(myProjects());
  };
  // const refreshUser = setUser(store.data);
  const positiveDiffs = (endDate) => {
    if (isValid(endDate)) {
      return formatDistanceToNow(new Date(endDate), { addSuffix: true });
    }
    return null;
  };
  const approvalColors = {
    deleted: 'secondary',
    approved: 'primary',
    paused: 'secondary'
  };
  useEffect(() => {
    if (store.status === 'success' && store.data?.data?.length > 0) {
      setFormData([...store.data.data]);
      setShowView(true);
    }
  }, [store.status]);
  useEffect(() => {
    dispatch(myProjects());
  }, []);
  return (
    <div>
      {
        showView
            && (
              <div className="w-100 margin-center m-t-40 ">
                <div className="login-form-container p-20">
                  {
                    store.status === 'pending'
                    && (
                      <Loader />
                    )
                  }
                  {
                    store.status === 'success'
                    && (
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
                                      <h3>
                                        {item.title}
                                        <Chip
                                          color={
                                            approvalColors[approvalStatus[item.approvalStatus]]
                                          }
                                          label={stringCaps(approvalStatus[item.approvalStatus])}
                                        />
                                      </h3>
                                      <small>
                                        {item.location || 'Anonymous location'}
                                      </small>
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
                                      <button type="button" className=" btn-edit text-edit w-100">
                                        <FiEdit className="mt-1 mr-1" />
                                        Edit
                                      </button>
                                      <button type="button" className="btn-sm btn-delete text-delete w-100 mt-5">
                                        <RiDeleteBin6Line className="mt-1 mr-1" />
                                        Delete
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
                    )
                  }
                  {
                    store.status === 'failed'
                    && (
                      <div className="login-form pb-5h">
                        <h3 className="bold text-dark">
                          we could not load your data
                        </h3>
                      </div>
                    )
                  }
                </div>
              </div>
            )
      }
    </div>

  );
};
export default Projects;
