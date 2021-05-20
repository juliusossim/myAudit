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
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20">
          <h3 className="bold text-dark">Profile</h3>
          <div className="row">
            <div className={`col-md-6 accordion-div  ${accordionTab === 1 && 'is-focus'}`}>
              <div className={`radius50 size4 center-items ${accordionTab === 1 ? 'border-wema' : 'faint-border'}`}>
                <button type="button" className={`radius50 size3 text-center  ${accordionTab === 1 ? 'bg-wema text-white' : 'text-muted'}`} onClick={() => setAccordionTab(1)}>1</button>
              </div>
            </div>
            <div className={`col-md-6 accordion-div  ${accordionTab === 2 && 'is-focus'}`}>
              <div className={`radius50 size4 center-items ${accordionTab === 2 ? 'border-wema' : 'faint-border'}`}>
                <button type="button" className={`radius50 size3 text-center text-white  ${accordionTab === 2 ? 'bg-wema text-white' : 'text-muted'}`} onClick={() => setAccordionTab(2)}>2</button>
              </div>
            </div>
          </div>
          <div className="login-form">
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
