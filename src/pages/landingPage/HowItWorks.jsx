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

const HowItWorks = () => {
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

  return (
    <div>
      {/* <CustomCarousel className="mh-25" content={carouselSlides} /> */}
      <div className="row bg-light" id="how">
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

      <div className="">
        <div className="content">
          <div className="w-100 margin-center m-t-40 projects">
            <div className="container text-left my-4">
              <div className="row justify-content-between ml-5 mr-5">
                <h2 className="theme-title">
                  About Wema Bank Crowdfunding
                </h2>
                <div className="">
                  <p className="bold py-5">
                    What Is Crowdfunding?
                  </p>
                  <p>
                    Crowdfunding is the use of small amounts of capital from a
                    large number of individuals to finance a new business venture.
                    Crowdfunding makes use of the easy accessibility of vast networks of
                    people through social media and crowdfunding websites to bring investors
                    and entrepreneurs together, with the potential to increase entrepreneurship
                    by expanding the pool of investors beyond the traditional circle of owners,
                    relatives, and venture capitalists.
                  </p>

                  <p className="bold py-5">KEY TAKEAWAYS</p>
                  <p>
                    Restrictions apply to who is allowed to fund a new business
                    and how much they are allowed to contribute.
                    Crowdfunding allows investors to select from hundreds of pro
                    jects and invest as little as $10.
                  </p>
                  <p>
                    Crowdfunding sites generate revenue from a percentage of the funds raised.
                    The SEC regulates equity-based crowdfunding ventures in the United States.
                    Kickstarter, Indiegogo, and GoFundMe are among the most popular
                    crowdfunding platforms.
                  </p>
                  <p className="bold py-5">
                    How Crowdfunding Works
                  </p>
                  <p>
                    In most jurisdictions, restrictions apply to who can fund a new business
                    and how much they are allowed to contribute. Similar to the restrictions
                    on hedge fund investing, these regulations
                    are supposed to protect unsophisticated
                    or non-wealthy investors from putting too much of their savings at risk.
                    Because so many new businesses fail, their investors face a high risk of
                    losing their principal.
                  </p>
                  <p>
                    Crowdfunding has created the opportunity for entrepreneurs to raise hundreds
                    Access to funding you otherwise might not qualify for from traditional sources
                    Great way to interact with potential consumers
                  </p>
                  <p>
                    Ability to gauge public opinion on your product

                    Must follow the rules/fees of the crowdfunding platform
                    In some cases, if you don not reach your funding goal, any
                    finance that has been pledged will be returned to your investors
                  </p>
                  <p>
                    Possible damage to your start-up company reputation

                    Examples of Crowdfunding
                    Crowdfunding FAQs
                    What Is Crowdfunding and How Does It Work?
                    Crowdfunding is the use of small amounts of capital from a large number
                    of individuals to finance a new business venture. Depending on the type
                    of crowdfunding,
                    investors either donate money altruistically or get rewards such
                    as equity in the company that raised the money.
                  </p>
                  <p>
                    Do You Pay Back Crowdfunding?
                    Is Crowdfunding Legal in Australia?
                    Yes. In 2017, the Australian government amended the 2001
                    Corporations Act to provide a legislative framework for crowd-sourced funding.

                    Is Crowdfunding Legal in Nigeria?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default HowItWorks;
