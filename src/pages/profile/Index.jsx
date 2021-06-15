import React, { useEffect, useState } from 'react';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Profile = () => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth.register);
  /* state */

  const [accordionTab, setAccordionTab] = useState(1);
  const [user, setUser] = useState(null);

  const goBack = () => {
    setAccordionTab(1);
  };
  useEffect(() => {
    localforage.getItem('user').then((data) => {
      setUser(data?.data?.user);
    });
    // console.log(user);
  }, [accordionTab, user]);

  return (
    <div className="content">
      <div className="max-w-750 max-w-750 w-750 margin-center m-t-40 ">
        <div className="login-form-container p-20">
          <h3 className="bold text-dark">Profile</h3>
          <div className="d-flex border">
            <div className={`p-md-2 accordion-div-2  ${accordionTab === 1 && 'is-focus'}`}>
              <button type="button" className={` no-border bg-transparent  ${accordionTab === 1 ? ' text-wema' : 'text-muted'}`} onClick={() => setAccordionTab(1)}>My Projects</button>
            </div>
            <div className={`p-md-2 accordion-div-2  ${accordionTab === 2 && 'is-focus'}`}>
              <button type="button" className={` no-border bg-transparent  ${accordionTab === 2 ? ' text-wema' : 'text-muted'}`} onClick={() => setAccordionTab(2)}>My Projects</button>
            </div>
            <div className={`p-md-2 accordion-div-2  ${accordionTab === 3 && 'is-focus'}`}>
              <button type="button" className={` no-border bg-transparent  ${accordionTab === 3 ? ' text-wema' : 'text-muted'}`} onClick={() => setAccordionTab(3)}>My Projects</button>
            </div>
            <div className={`p-md-2 accordion-div-2  ${accordionTab === 4 && 'is-focus'}`}>
              <button type="button" className={` no-border bg-transparent  ${accordionTab === 4 ? ' text-wema' : 'text-muted'}`} onClick={() => setAccordionTab(4)}>My Projects</button>
            </div>
            <div className={`p-md-2 accordion-div-2  ${accordionTab === 5 && 'is-focus'}`}>
              <button type="button" className={` no-border bg-transparent  ${accordionTab === 5 ? ' text-wema' : 'text-muted'}`} onClick={() => setAccordionTab(5)}>My Projects</button>
            </div>

          </div>
          <div className="login-form ">
            my profile
          </div>
        </div>
      </div>
      {/* <Modal
        className={show ? 'max-w-400 right top' : 'max-w-400 right top off'}
        content={modalTemplate}
      /> */}
    </div>
  );
};

export default Profile;
