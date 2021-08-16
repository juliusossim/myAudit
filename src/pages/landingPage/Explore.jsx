import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight, IoSadOutline } from 'react-icons/all';
import { projectAction, projectCategories, uploadMedia } from '../../redux/actions/projectActions';
import { apiOptions } from '../../services/fetch';
import Loader from '../../components/microComponents/loader';
import ProjectInfo from '../../components/ui/projectInfo';
import { sentenceCaps, slugify, stringCaps } from '../../utilities/stringOperations';
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
  const [pQuery, setPQuery] = useState({});
  const [sortBy, setSortBy] = useState('all categories');

  useEffect(() => {
    dispatch(projectCategories());
    searchProjects();
  }, []);
  // useEffect(() => {
  //   searchProjects();
  // }, [pQuery]);

  useEffect(() => {
    const sortParam = sortCats.filter((item) => item?.id === formData.sort)[0]?.type;
    setSortBy(sortParam);
    // setPQuery({ sortBy: slugify(sortParam, '_') });
    searchProjects({ sortBy: slugify(sortParam, '_') });
  }, [formData.sort]);

  const filterCategories = (categoryId) => {
    setPQuery({ categoryId });
    searchProjects({ categoryId });
  };
  const searchProjects = useCallback((slug) => {
    // console.log(pQuery);
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
        <div className="row">
          <div className="content">
            <div className="w-100 row margin-center m-t-40">
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
                            <Link to="#" onClick={() => filterCategories(cat?.id)} className="py-2 " key={cat.id}>
                              <span className="font-22 font-black theme-font">
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
                <div className="row projects text-left mt-5 ">
                  <div className="row justify-content-between pr-3">
                    <p className="bold font-22">
                      {sentenceCaps(sortBy)}
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
                  <div className="row justify-content-between">
                    {
                      store?.searchProjects?.status === 'pending'
                        && <Loader />
                    }
                    {
                      store?.searchProjects?.data?.data?.items?.map(
                        (item, key) => (
                          <div key={item.id} className="col-md-4">
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
