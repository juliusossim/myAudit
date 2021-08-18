import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight, IoSadOutline } from 'react-icons/all';
import { projectAction, projectCategories, uploadMedia } from '../../redux/actions/projectActions';
import { apiOptions } from '../../services/fetch';
import Loader from '../../components/microComponents/loader';
import ProjectInfo from '../../components/ui/projectInfo';
import {
  sentenceCaps, slugify, stringCaps, stringDoesNotExist
} from '../../utilities/stringOperations';
import SelectInput from '../../components/form/inputs/SelectInput';
import { projectType, sortCats } from '../../utilities/dummyData';

const Explore = () => {
  const startProject = () => {
    /**
     Todo: redirect to project page.
     */
    window.location.replace('/register');
  };
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project);

  /* state */

  const [formData, setFormData] = useState({});
  const [sortBy, setSortBy] = useState('all categories');

  useEffect(() => {
    dispatch(projectCategories());
    searchProjects();
  }, []);

  useEffect(() => {
    const sortParam = sortCats.filter((item) => item?.id === formData.sort)[0]?.type;
    if (!stringDoesNotExist(sortParam)) {
      setSortBy(sortParam);
      searchProjects({ OrderBy: slugify(sortParam, '-') });
    }
  }, [formData.sort]);

  const filterCategories = (CategoryId) => {
    searchProjects({ CategoryId });
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
  return (
    <div className="">
      <div className="">
        <div className="">
          <div className="content">
            <div className="w-100 row  m-t-40">
              <div className="col-md-3 my-4">
                {
                  store?.projectCategories?.status === 'pending'
                  && <Loader />
                }
                {
                  store?.projectCategories?.status === 'success'
                  && (
                    <div className="card-containe bg-wema-light projects mt-5 py-4 pl-4">
                      <p className="bold font-22">
                        Explore Categories
                      </p>
                      <div className="pt-3">
                        {
                          store?.projectCategories?.data?.data?.map((cat) => (
                            <Link to="#" onClick={() => filterCategories(cat?.id)} className="py-2 sixth" key={cat.id}>
                              <span className="font-22 font-black theme-font  ">
                                {stringCaps(cat.name)}
                              </span>
                              <span className="float-right mr-3 text-muted">
                                <AiOutlineArrowRight />
                              </span>
                              <hr className="bg-black" />
                            </Link>
                          ))
                        }
                      </div>
                    </div>
                  )

                }
                {
                  store?.projectCategories?.status === 'failed'
                  && (
                    <div className="card-containe bg-wema-light text-center projects mt-5 py-4 pl-4">
                      <IoSadOutline />
                      <p className="bold font-22 text-warning">
                        Failed To Load Categories
                      </p>
                    </div>
                  )
                }
              </div>
              <div className="my-4 col-md-9">
                <div className="col-12  projects text-left mt-5 ">
                  <div className="row justify-content-between pr-3">
                    <p className="bold font-22">
                      {sentenceCaps(sortBy) || 'All Categories'}
                    </p>
                    <div>
                      <div className=" d-flex">
                        <div className="pr-2 pt-2">
                          <p className="theme-font bold">Sort By</p>
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
                  <div className="row">
                    {
                      store?.searchProjects?.status === 'pending'
                        && <div className="col-12"><Loader /></div>
                    }
                    {
                      store?.searchProjects?.status === 'success'
                      && store?.searchProjects?.data?.data?.items?.map(
                        (item, key) => (
                          <div key={item.id} className="col-md-4 mb-4">
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
                    {
                      store?.searchProjects?.status === 'failed'
                      && (
                        <div className="card-body">
                          We could not load the requested data at this time.
                        </div>
                      )
                    }
                  </div>

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
