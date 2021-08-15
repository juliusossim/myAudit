import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomCarousel from '../../components/microComponents/carousel';
import LazyImage from '../../components/microComponents/lazyImg';
import howItWorks from '../../assets/images/howItWorks.svg';
import { getOneName } from '../../utilities/stringOperations';
import { diffDays } from '../../utilities/dateOperations';
import { popularProjects, raisersCategory } from '../../utilities/dummyData';
import { projectAction } from '../../redux/actions/projectActions';
import { apiOptions } from '../../services/fetch';
import Loader from '../../components/microComponents/loader';
import ProjectInfo from '../../components/ui/projectInfo';

const GeneralPage = () => {
  const startProject = () => {
    /**
     Todo: redirect to project page.
     */
    window.location.replace('/register');
  };
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.home);
  // const carouselSlides = [
  //   {
  //     content: (
  //       <div className="slide1">
  //         {/* <LazyImage src={firstImage} alt="make a difference" /> */}
  //         <div className="content1">
  //           <p className="small1">
  //             Wemabank Crowdfunding
  //           </p>
  //           <div className="hero">
  //             Fundraising for projects and causes that
  //             matter to humanity.
  //           </div>
  //
  //           <small className="small2">
  //             raise funds with ease and securely. get started now...
  //           </small>
  //           <div>
  //             <button type="button" className="btn btn-small butt" onClick={startProject}>
  //               Start Project Today
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //     id: 1
  //   },
  //   {
  //     content: <div>hello</div>,
  //     id: 2
  //   }
  // ];
  // const firstImg = import('../../assets/images/kat-yukawa-K0E6E0a0R3A-unsplash 1.svg')
  //   .then((makeChange) => <LazyImage src={makeChange} alt="make a difference" />);

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

  useEffect(() => {
    popularFundraisers();
    popularNgos();
  }, []);

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

  return (
    <div>
      {/* <CustomCarousel className="mh-25" content={carouselSlides} /> */}
      <div className="slide1">
        {/* <LazyImage src={firstImage} alt="make a difference" /> */}
        <div className="content1">
          <p className="small1">
            Wemabank Crowdfunding
          </p>
          <div className="hero">
            Fundraising for projects and causes that
            matter to humanity.
          </div>

          <small className="small2">
            Raise funds with ease and securely. get started now...
          </small>
          <div>
            <button type="button" className="btn btn-small butt" onClick={startProject}>
              Start a Project Today
            </button>
          </div>
        </div>
      </div>
      <div className="row bg-light">
        <div className="content">
          <div className="w-100 margin-center m-t-40 ">
            <div className="center-text my-4 ">
              <h3 className="howItWorks text-center">
                How It works with Wemabank Crowdfunding
              </h3>
              <div className="pl-2 ">
                <img src={howItWorks} alt="how It works" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row bg-wema-light">
        <div className="content">
          <div className="w-100 margin-center m-t-40">
            <div className="my-4">
              <div className="row projects text-left mt-5 ">
                <div className="row justify-content-between ml-5 mr-5">
                  <h3>
                    Most Popular Fundraisers
                  </h3>
                  <button type="button" className="text-wema float-right viewMoreBtn">
                    View More &gt;
                  </button>
                </div>
                {
                  store?.popularFundraisers?.status === 'pending'
                    ? <Loader />
                    : store?.popularFundraisers?.data?.data?.map(
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
      <div className="row bg-light">
        <div className="content">
          <div className="w-100 margin-center m-t-40">
            <div className="category row justify-content-center my-4">
              <div className="text-center title">
                Browse Fundraisers Categories
              </div>
              <div className="row ">
                <div className="col-md-8 offset-md-2 ">
                  {
                    raisersCategory.map(
                      (category) => (
                        <Link to="/" key={category} type="button" className="px-5 m-2 pt-2 transformed-4 categoryButtons butt" data-text={category}>
                          <span className="">
                            {category}
                          </span>
                        </Link>
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

export default GeneralPage;
