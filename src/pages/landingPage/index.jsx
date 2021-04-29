import React from 'react';
import CustomCarousel from '../../components/microComponents/carousel';
import LazyImage from '../../components/microComponents/lazyImg';
import howItWorks from '../../assets/images/howItWorks.svg';
import { getOneName } from '../../utilities/stringOperations';
import { diffDays } from '../../utilities/dateOperations';
import { popularProjects, raisersCategory } from '../../utilities/dummyData';

const GeneralPage = () => {
  const startProject = () => {
    /**
     Todo: redirect to project page.
     */
    window.location.replace('/register');
  };

  const carouselSlides = [
    {
      content: (
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
              raise funds with ease and securely. get started now...
            </small>
            <div>
              <button type="button" className="btn btn-small butt" onClick={startProject}>
                Start Project Today
              </button>
            </div>
          </div>
        </div>
      ),
      id: 1
    },
    {
      content: <div>hello</div>,
      id: 2
    }
  ];
  // const firstImg = import('../../assets/images/kat-yukawa-K0E6E0a0R3A-unsplash 1.svg')
  //   .then((makeChange) => <LazyImage src={makeChange} alt="make a difference" />);

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
      <CustomCarousel className="mh-25" content={carouselSlides} />
      <div className="center-text page">
        <h3 className="howItWorks text-center">
          How It works with Wemabank Crowdfunding
        </h3>
        <div className="pl-2 ">
          <img src={howItWorks} alt="how It works" />
        </div>
      </div>
      <div className="projectsSection">
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
            popularProjects.map(
              (item, key) => (
                <div key={`project ${item.id}`} className="col-md-3 mt-5">
                  <div>
                    <LazyImage src={item.photo} alt={item.name} />
                  </div>
                  <h3>
                    {item.name}
                  </h3>
                  <small>
                    {item.location}
                  </small>
                  <div>
                    {item.description}
                  </div>
                  <span className="pr-1 raised">
                    {`N${item.raised}`}
                  </span>
                  <span>
                    raised of
                    {' '}
                    {`N${item.target}`}
                  </span>
                  <div className="progress" title={`N${(item.target - item.raised)} to hit target`}>
                    <div
                      className="progress-bar bg-wema"
                      role="progressbar"
                      aria-valuenow={(item.raised / item.target) * 100}
                      style={{ width: `${(item.raised / item.target) * 100}%` }}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-labelledby="progress_bar"
                    />
                  </div>
                  <div className="col-4">
                    <p>
                      Posted by:
                    </p>
                    {getOneName(item.manager_name)}
                  </div>
                  <div className="col-4">
                    <p>
                      Fund %:
                    </p>
                    { `${((item.raised / item.target) * 100).toFixed(0)}%` }
                  </div>
                  <div className="col-4">
                    <p>
                      Duration
                    </p>
                    {
                      positiveDiffs(new Date(item.created_at), item.duration).diff !== 0
                        ? (
                          <p className={positiveDiffs(new Date(item.created_at), item.duration).left ? '' : 'text-danger'}>
                            {positiveDiffs(new Date(item.created_at), item.duration).diff}
                            <span className="pl-1">
                              {positiveDiffs(new Date(item.created_at), item.duration).left ? 'days left' : 'days due'}
                            </span>
                          </p>
                        ) : 'due now'
                    }
                  </div>
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
            popularProjects.map(
              (item, key) => (
                <div key={`project ${item.id}`} className="col-md-3 mt-5">
                  <div>
                    <LazyImage src={item.photo} alt={item.name} />
                  </div>
                  <h3>
                    {item.name}
                  </h3>
                  <small>
                    {item.location}
                  </small>
                  <div>
                    {item.description}
                  </div>
                  <span className="pr-1 raised">
                    {`N${item.raised}`}
                  </span>
                  <span>
                    raised of
                    {' '}
                    {`N${item.target}`}
                  </span>
                  <div className="progress" title={`N${(item.target - item.raised)} to hit target`}>
                    <div
                      className="progress-bar bg-wema"
                      role="progressbar"
                      aria-valuenow={(item.raised / item.target) * 100}
                      style={{ width: `${(item.raised / item.target) * 100}%` }}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-labelledby="progress_bar"
                    />
                  </div>
                  <div className="col-6 col-md-4">
                    <p>
                      Posted by:
                    </p>
                    <p className="posted-by">
                      {getOneName(item.manager_name)}
                    </p>
                  </div>
                  <div className="col-6 col-md-4">
                    <p>
                      Fund %:
                    </p>
                    <p className="posted-by">
                      { `${((item.raised / item.target) * 100).toFixed(0)}%` }
                    </p>
                  </div>
                  <div className="col-6 col-md-4">
                    <p>
                      Duration
                    </p>
                    {
                      positiveDiffs(new Date(item.created_at), item.duration).diff !== 0
                        ? (
                          <p className={positiveDiffs(new Date(item.created_at), item.duration).left ? 'text-wema posted-by' : 'text-danger'}>
                            {positiveDiffs(new Date(item.created_at), item.duration).diff}
                            <span className="pl-1">
                              {positiveDiffs(new Date(item.created_at), item.duration).left ? 'days left' : 'days due'}
                            </span>
                          </p>
                        ) : (
                          <p>
                            due now
                          </p>
                        )
                    }
                  </div>
                </div>
              )
            )
          }
        </div>
      </div>
      <div className="category text-center">
        <div className="text-center title">
          Browse Fundraisers Categories
        </div>
        {
          raisersCategory.map(
            (category) => (
              <button type="button" className="categoryButtons butt">
                <span>
                  {category}
                </span>
              </button>
            )
          )
        }
      </div>
    </div>
  );
};

export default GeneralPage;
