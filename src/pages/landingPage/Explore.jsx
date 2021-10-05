import React, { useCallback, useEffect, useState } from 'react';
import Tada from 'react-reveal/Tada';
import Fade from 'react-reveal/Fade';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  AiOutlineArrowRight, ImMenu3, IoSadOutline
} from 'react-icons/all';
import { projectAction, projectCategories, uploadMedia } from '../../redux/actions/projectActions';
import { apiOptions } from '../../services/fetch';
import Loader from '../../components/microComponents/loader';
import ProjectInfo from '../../components/ui/projectInfo';
import {
  notifier,
  sentenceCaps, slugify, stringCaps, stringDoesNotExist
} from '../../utilities/stringOperations';
import SelectInput from '../../components/form/inputs/SelectInput';
import { projectType, sortCats } from '../../utilities/dummyData';
import PageTemp from '../../components/temps/PageTemp';
import Sidebar from '../../layouts/Sidebar';

const Explore = () => {
  const { cat } = useLocation();
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project);

  /* state */

  const [formData, setFormData] = useState({});
  const [sortBy, setSortBy] = useState(cat?.name);
  const [showCats, setShowCats] = useState(false);
  const indexData = { ...JSON.parse(localStorage.getItem('index')) };

  useEffect(() => {
    if (store?.searchProjects?.status === 'initial') {
      if (cat === undefined) {
        searchProjects();
      } else {
        searchProjects({ CategoryId: cat?.id });
      }
    }
    if (store?.searchProjects?.status === 'failed') {
      notifier({
        title: 'error',
        type: 'error',
        text: store?.searchProjects?.data
          || store?.searchProjects?.data?.message
          || 'could not load your projects'
      });
    }
  }, [store?.searchProjects?.status]);

  useEffect(() => {
    const sortParam = sortCats.filter((item) => item?.id === formData.sort)[0]?.type;
    if (!stringDoesNotExist(sortParam)) {
      setSortBy(sortParam);
      searchProjects({ OrderBy: slugify(sortParam, '-') });
    }
  }, [formData.sort]);

  const filterCategories = (Category) => {
    setSortBy(Category.name);
    searchProjects({ CategoryId: Category.id });
    setShowCats(false);
  };
  const searchProjects = useCallback((slug) => {
    dispatch(projectAction(
      {
        action: 'SEARCH_PROJECTS',
        routeOptions: apiOptions({
          method: 'get',
          endpoint: 'SEARCH_PROJECTS',
          pQuery: slug
        })
      }
    ));
  }, []);

  const handleChange = (e) => {
    const {
      name, value, files, apiValue
    } = e?.target;
    let val = value;
    if (name === 'sort') {
      val = Number(val);
    }
    return setFormData((state) => ({
      ...state,
      [name]: val
    }));
  };

  const projectTemps = (
    <div className="row">
      {
        store?.searchProjects?.data?.data?.items?.map(
          (item, key) => (
            <div key={item.id} className="col-md-6 col-lg-4 mb-4">
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
    <div className="">
      <div className="">
        <div className="">
          <div className="content">
            <div className="w-100 row  m-t-40">
              <div className="col-md-3 my-md-4">
                {
                  indexData?.categories?.length > 0
                  && (
                    <Sidebar
                      showCats={showCats}
                      setShowCats={setShowCats}
                      filterCategories={filterCategories}
                      cats={indexData.categories}
                    />
                  )
                }
                {
                  store?.index?.status === 'failed'
                  && (
                    <div className="card-container bg-wema-light text-center projects mt-md-5 py-md-4 pl-4">
                      <p className="bold font-22 text-warning">
                        Failed To Load Categories
                      </p>
                    </div>
                  )
                }
              </div>
              <div className="my-md-4 col-md-9">
                <div className="col-12  projects text-left mt-md-5 mt-2 ">
                  <div className="row justify-content-between pr-3">
                    <p className="bold font-22 mb-2 mb-md-0">
                      {sentenceCaps(sortBy) || 'All Categories'}
                    </p>
                    <div>
                      <div className=" d-flex">
                        <div className="pr-2 pt-2">
                          <p className="theme-font font-bold">Sort By</p>
                        </div>
                        <div className="">
                          <SelectInput
                            options={sortCats}
                            valueIndex="id"
                            optionIndex="type"
                            titleIndex="description"
                            value={formData.sort}
                            onChange={handleChange}
                            name="sort"
                            className="theme-font font-black font-14"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <PageTemp
                    view={projectTemps}
                    status={store?.searchProjects?.status}
                    noData={store?.searchProjects?.data?.data?.items?.length === 0}
                    error={
                      (
                        <div className="card-body">
                          We could not fetch the filter results.
                          you can try again.
                        </div>
                      )
                    }
                  />

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
