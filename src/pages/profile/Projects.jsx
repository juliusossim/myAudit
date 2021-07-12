import React, { useEffect, useState } from 'react';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import { FiEdit, RiDeleteBin6Line } from 'react-icons/all';
import { myProjects } from '../../redux/actions/profileActions';
import LazyImage from '../../components/microComponents/lazyImg';
import { getOneName } from '../../utilities/stringOperations';
import { diffDays } from '../../utilities/dateOperations';

const Projects = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile.projects);
  const [formData, setFormData] = useState([]);
  const [showView, setShowView] = useState(false);
  const getUser = () => {
    dispatch(myProjects());
  };
  // const refreshUser = setUser(store.data);
  const positiveDiffs = (second, duration) => {
    const diff = duration - diffDays({
      firstDate: new Date(Date.now()),
      secondDate: new Date(second)
    });
    return ({
      left: diff > 0,
      diff
    });
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
    store.status === 'pending'
      ? <div>projects pending</div>
      : (
        <div>
          {
            showView
            && (
              <div className="w-100 margin-center m-t-40 ">
                <div className="login-form-container p-20">
                  <div className="login-form pb-5h">
                    <div>
                      {
                        formData.map(
                          (item, key) => (
                            <div key={Math.random()}>
                              <div key={`project ${item.id}`} className="row mt-5">
                                <div className="col-md-5">
                                  <LazyImage src={item.photo} alt={item.title} />
                                </div>
                                <div className="col-md-5 mb-5">
                                  <h3>
                                    {item.title}
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
                                      <span className="bold mr-1">{`N${item.amountRaised || 0}`}</span>
                                      raised
                                    </div>
                                    <div className="col-md-6 ">
                                      <span>Target</span>
                                      <span className="bold">{` N${item.donationTarget || 0}`}</span>
                                    </div>
                                  </div>
                                  <div className="progress mt-2 mb-3" title={`N${(item.donationTarget - item.amountRaised || 0)} to hit target`}>
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
                                        positiveDiffs(new Date(item.created_at), item.duration).diff
                                        !== 0
                                          ? (
                                            <span>
                                              {`Duration ${positiveDiffs(new Date(item.created_at), item.duration).diff}`}
                                              <span className="pl-1">
                                                {positiveDiffs(new Date(item.created_at), item.duration).left ? 'days left' : 'days due'}
                                              </span>
                                            </span>
                                          ) : 'due now'
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
                                    <button type="button" disabled={positiveDiffs(new Date(item.created_at), item.duration).diff > 11} className="btn mt-5">
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
                </div>
              </div>
            )
          }
        </div>
      )
  );
};
export default Projects;
