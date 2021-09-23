import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomCarousel from '../../components/microComponents/carousel';
import LazyImage from '../../components/microComponents/lazyImg';
import howItWorks from '../../assets/images/howItWorks.svg';
import { projectAction } from '../../redux/actions/projectActions';
import { apiOptions } from '../../services/fetch';
import Loader from '../../components/microComponents/loader';
import ProjectInfo from '../../components/ui/projectInfo';
import PageTemp from '../../components/temps/PageTemp';

const GeneralPage = () => {
  const startProject = () => {
    /**
     Todo: redirect to project page.
     */
    window.location.replace('/register');
  };
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  /* state */
  const [projects, setProjects] = React.useState([]);
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

  const popularProjects = useCallback(() => {
    dispatch(projectAction(
      {
        action: 'POPULAR_PROJECTS',
        routeOptions: apiOptions({
          method: 'get',
          endpoint: 'POPULAR_PROJECTS'
        })
      }
    ));
  }, []);

  useEffect(() => {
    popularProjects();
  }, []);
  useEffect(() => {
    if (store?.home?.popularProjects?.status === 'success') {
      setProjects(store?.home?.popularProjects?.data?.data);
    }
  }, [store?.home?.popularProjects?.status]);

  const popularNgosTemp = (
    <div className="">
      {
        projects?.popularNGOs?.map(
          (item, key) => (
            <div key={item.id} className="col-md-3 mb-4">
              <div className="">
                <ProjectInfo
                  styled
                  project={item}
                />
              </div>
            </div>
          )
        )
      }
    </div>
  );
  const popularFundraisersTemp = (
    <div>
      {
        projects?.popularFundraisers?.map(
          (item, key) => (
            <div key={item.id} className="col-md-3 mb-4">
              <div className="">
                <ProjectInfo
                  styled
                  project={item}
                />
              </div>
            </div>
          )
        )
      }
    </div>
  );

  return (
    <div>
      {/* <CustomCarousel className="mh-25" content={carouselSlides} /> */}
      <div className="slide1">
        {/* <LazyImage src={firstImage} alt="make a difference" /> */}
        <div className="content1">
          <p className="small1">
            Wema Bank Crowdfunding
          </p>
          <div className="hero">
            Fundraising for projects and causes that
            matter to humanity.
          </div>

          <small className="small2">
            Raise funds with ease and securely. get started now...
          </small>
          <div className="mb-sm-3">
            <Link to="/create-project" className="btn btn-small hover-wema">
              Start a Project Today
            </Link>
          </div>
        </div>
      </div>
      <div className="row bg-light">
        <div className="content">
          <div className="w-100 margin-center ">
            <div className="center-text my-2">
              <h3 className="howItWorks text-center">
                How It works with Wema Bank Crowdfunding
              </h3>
              <div className="pl-2 ">
                <img src={howItWorks} alt="how It works" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-wema-light">
        <div className="content">
          <div className="w-100 margin-center m-t-40 projects">
            <div className="container text-left my-4">
              <div className="row justify-content-between ml-5 mr-5">
                <h3 className="theme-title">
                  Most Popular Fundraisers
                </h3>
                {
                  projects?.popularFundraisers?.length > 4
                  && (
                    <button type="button" className="text-wema float-right viewMoreBtn">
                      View More &gt;
                    </button>
                  )
                }
              </div>
              <PageTemp
                view={popularFundraisersTemp}
                status={store?.home?.popularProjects?.status}
                noData={projects?.popularFundraisers?.length === 0}
              />
            </div>
            <div className="container  mt-5 ">
              <div className="row justify-content-between ml-5 mr-5">
                <h3>
                  Most Popular NGOs
                </h3>
                {
                  projects?.popularNGOs?.length > 4
                  && (
                    <button type="button" className="text-wema float-right viewMoreBtn">
                      View More &gt;
                    </button>
                  )
                }
              </div>
              <PageTemp
                view={popularNgosTemp}
                status={store?.home?.popularProjects?.status}
                noData={projects?.popularNGOs?.length === 0}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={store?.project?.projectCategories?.data?.data?.length > 0 ? 'row bg-light' : 'd-none'}>
        <div className="content">
          <div className="w-100 margin-center m-t-40">
            <div className="category row justify-content-center my-4">
              <div className="text-center title">
                Browse Fundraisers Categories
              </div>
              <div className="row ">
                <div className="col-md-8 offset-md-2 text-center ">
                  {
                    store?.project?.projectCategories?.data?.data?.map(
                      (category) => (
                        <Link to={{ pathname: '/explore', cat: category }} key={category.name} type="button" className="px-5 m-2 pt-2 transformed-4 categoryButtons butt" data-text={category.name}>
                          <span className="">
                            {category.name}
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
