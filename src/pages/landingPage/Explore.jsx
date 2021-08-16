import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineArrowNarrowRight } from 'react-icons/all';
import { projectAction } from '../../redux/actions/projectActions';
import { apiOptions } from '../../services/fetch';
import Loader from '../../components/microComponents/loader';
import ProjectInfo from '../../components/ui/projectInfo';

const Explore = () => {
  const startProject = () => {
    /**
     Todo: redirect to project page.
     */
    window.location.replace('/register');
  };
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.home);

  const popularFundraisers = useCallback(() => {
    dispatch(projectAction(
      {
        action: 'POPULAR_FUNDRAISERS',
        routeOptions: apiOptions({
          method: 'get',
          endpoint: 'POPULAR_FUNDRAISERS'
        })
      }
    ));
  }, []);
  const popularNgos = useCallback(() => {
    dispatch(projectAction(
      {
        action: 'POPULAR_NGOS',
        routeOptions: apiOptions({
          method: 'get',
          endpoint: 'POPULAR_NGOS'
        })
      }
    ));
  }, []);
  const categories = [
    'education',
    'education',
    'education',
    'education',
    'education',
    'education'
  ];

  useEffect(() => {
    popularFundraisers();
    popularNgos();
  }, []);

  return (
    <div className="">
      <div className="">
        <div className="row">
          <div className="content">
            <div className="w-100 row margin-center m-t-40">
              <div className="col-md-3 my-4">
                <div className="card-container projects mt-5 px-2">
                  <h3>
                    Explore Categories
                  </h3>
                  <div className="ml-3 px-3">
                    {
                      categories.map((cat) => (
                        <div className="row justify-content-between  ">
                          <div>
                            {cat}
                          </div>
                          <div className="">
                            <HiOutlineArrowNarrowRight />
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className="my-4 col-md-9">
                <div className="row projects text-left mt-5 ">
                  <div className="row justify-content-between ml-5 mr-5">
                    <h3>
                      Most Popular Fundraisers
                    </h3>
                  </div>
                  {
                    store?.popularFundraisers?.status === 'pending'
                      ? <Loader />
                      : store?.popularFundraisers?.data?.data?.map(
                        (item, key) => (
                          <div className="col-md-4">
                            <ProjectInfo
                              styled
                              project={item}
                            />
                          </div>
                        )
                      )
                  }
                </div>
                <div className="row projects text-left mt-5 ">
                  <div className="row justify-content-between ml-5 mr-5">
                    <h3>
                      Most Popular NGOs
                    </h3>
                    <button type="button" className="text-wema float-right viewMoreBtn">
                      View More &gt;
                    </button>
                  </div>
                  {
                    store?.popularNgos?.status === 'pending'
                      ? <Loader />
                      : store?.popularNgos?.data?.data?.map(
                        (item, key) => (
                          <div className="col-md-3">
                            <ProjectInfo
                              styled
                              project={item}
                            />
                          </div>
                        )
                      )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Explore;
