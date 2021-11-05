import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Fade, Flip } from 'react-reveal';
import * as Scroll from 'react-scroll';
import {
  homeLinks, homePageTexts, playDownIcon, safetySvg, serviceCards, whoWeAre
} from '../../utilities/dummyData';
import ListMat from '../../components/ui/listMat';

const GeneralPage = () => (
  <div>
    {/* <CustomCarousel className="mh-25" content={carouselSlides} /> */}
    <div className="slide1">
      {/* <LazyImage src={firstImage} alt="make a difference" /> */}
      <Fade left cascade>
        <div className="content1">
          <div className="font-hero text-white theme-font-bold bold">
            <span>{homePageTexts.hero1}</span>
            <span className="text-theme mx-1">{homePageTexts.styled}</span>
            <span>{homePageTexts.hero2}</span>
          </div>
          <div className="font-title-small text-white">
            <p>
              {homePageTexts.text1.first}
              {homePageTexts.text1.second}
              {homePageTexts.text1.third}
            </p>
          </div>
          <div className="mb-sm-3 mt-5">
            <Link to="/create-project" className="position-relative">
              <span>{playDownIcon}</span>
              <span className="text-white font-small bold theme-font-bold position-absolute howWeWork">How we work</span>
            </Link>
          </div>
        </div>
      </Fade>
      <div className="down_arrow">
        <Scroll.Link
          activeClass=""
          to="whoWeAre"
          spy
          smooth
          offset={-65}
          duration={800}
          className=""
        >
          <svg className="arrows">
            <path className="a1" d="M0 0 L30 32 L60 0" />
            <path className="a2" d="M0 20 L30 52 L60 20" />
            <path className="a3" d="M0 40 L30 72 L60 40" />
          </svg>
        </Scroll.Link>
      </div>
    </div>

    <div className="" id="whoWeAre">
      <div className="content">
        <div className="w-100 margin-center m-t-40 projects">
          <div className="row">
            <div className="col-md-6 whoWeAreContainer">
              <h1 className="font-hero bold text-theme-black">
                Who we are
              </h1>
              <p className="font-regular text-theme-grey">
                We are technology solution provider aimed at making your
              </p>
              <p className="font-regular text-theme-grey">
                business less stressful while you focus on growing your business.
              </p>
              <div className="">
                <ListMat props={homeLinks} clss={{ main: 'quick-links', item: 'font-small simple-hover' }} />
              </div>
            </div>
            <div className="col-md-6">
              {whoWeAre}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-theme-black">
      <div className="content">
        <div className="w-100 margin-center m-t-40 projects">
          <div className="row">
            <div className="col-md-8">
              <p className="font-title-small font-30 text-white">
                Would you like to speak to one of our financial advisers?
              </p>
              <p className="font-regular text-white">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Just submit your contact details and we'll be in touch shortly.
              </p>
            </div>
            <div className="col-md-4">
              <button type="button" className="btn px-5 py-3">Get A Quote</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-theme-off-white whatWedo">
      <div className="content">
        <div className="w-100 margin-center m-t-40 projects">
          <div className="text-center">
            <p className="font-title theme-font-bold bold text-theme-black">
              What we do
            </p>
            <p className="font-regular text-theme-grey">
              We provide solutions to enable you perform audits seamlessly
            </p>
          </div>
          <div className="row mt-5">
            {
              serviceCards.map((card) => (
                <div className="col-md-4 mt-3 mt-md-0 mb-3" key={card.title}>
                  <div className="custom-box">
                    <div className="row position-relative">
                      <div className="oval-container">
                        <div className="oval">
                          <div className="icon-div">
                            {card.icon}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <p className="text-center font-title-small theme-font-bold">{card.title}</p>
                      <p>{card.text}</p>
                      <Link to={card.to}>
                        <div className="mt-2">
                          <span className="mr-2">view more</span>
                          <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.390625 4.17578C0.296875 4.26953 0.25 4.39844 0.25 4.5625C0.25 4.72656 0.296875 4.86719 0.390625 4.98438C0.507812 5.07812 0.648438 5.125 0.8125 5.125H11.8164L9.42578 7.55078C9.14453 7.80859 9.13281 8.07812 9.39062 8.35938C9.67188 8.61719 9.94141 8.60547 10.1992 8.32422L13.5742 4.94922C13.6445 4.90234 13.6914 4.84375 13.7148 4.77344C13.7383 4.70312 13.75 4.63281 13.75 4.5625C13.75 4.49219 13.7383 4.42188 13.7148 4.35156C13.6914 4.28125 13.6445 4.22266 13.5742 4.17578L10.1992 0.800781C9.94141 0.519531 9.67188 0.519531 9.39062 0.800781C9.13281 1.05859 9.14453 1.31641 9.42578 1.57422L11.8164 4H0.8125C0.648438 4 0.507812 4.05859 0.390625 4.17578Z" fill="#FFA500" />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white box-safety-container">
      <div className="content">
        <div className="w-100 margin-center m-t-40">
          <div className="box-safety p-5">
            <div className="row">
              <div className="col-md-6">
                <p className="font-title text-theme-black bold theme-font-bold max-w-300">
                  Safety and confidentiality guaranteed.
                </p>
                <p className="font-regular text-theme-grey max-w-400">
                  At Myaudit, we take data security very seriously
                  and have made our platform very secure.
                </p>
                <div className="my-3">
                  <button type="button" className="btn theme-hover px-5 py-3">Get A Quote</button>
                </div>
              </div>
              <div className="col-md-6">
                {safetySvg}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

);

export default GeneralPage;
