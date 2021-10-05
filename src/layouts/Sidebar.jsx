import { AiOutlineArrowRight, ImMenu3 } from 'react-icons/all';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import React from 'react';
import { stringCaps } from '../utilities/stringOperations';

const Sidebar = ({
  setShowCats, showCats, cats, filterCategories
}) => (
  <div className="card-container bg-wema-light projects mt-md-5 mt-2 py-1 py-md-4 pl-4">
    <p className="bold font-22 d-none d-md-block d-lg-block">
      Explore Categories
    </p>
    <div className="bold font-22 d-md-none d-lg-none">
      <button onClick={() => setShowCats(!showCats)} className="btn-plain row justify-content-between" type="button">
        <div>
          Explore Categories
        </div>
        <div className="text-wema">
          <ImMenu3 />
        </div>

      </button>
    </div>
    <div className={showCats ? 'pt-3 d-md-none d-lg-none d-xl-none' : 'pt-3 d-none'}>
      {
        cats?.map((category) => (
          <Link to="#" onClick={() => filterCategories(category)} className="py-2" key={category.id}>
            <div className="categoryLink">
              <span className="font-22 font-black theme-font  ">
                {stringCaps(category.name)}
              </span>
              <span className="float-right mr-3 text-muted">
                <AiOutlineArrowRight className="catIcon" />
              </span>

              <hr className="bg-black" />

            </div>
          </Link>

        ))
      }
    </div>
    <div className="pt-3 d-md-block d-none">
      {
        cats?.map((category) => (
          <Link to="#" onClick={() => filterCategories(category)} className="py-2" key={category.id}>
            <div className="categoryLink">
              <span className="font-22 font-black theme-font  ">
                {stringCaps(category.name)}
              </span>

              <Fade left>
                <span className="float-right mr-3 text-muted">
                  <AiOutlineArrowRight className="catIcon" />
                </span>
              </Fade>
              <hr className="bg-black" />
            </div>
          </Link>

        ))
      }
    </div>
  </div>
);
export default Sidebar;
