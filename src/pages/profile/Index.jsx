import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyAccount from './MyAccount';
import Transactions from './Transactions';
import WithdrawalDetails from './WithdrawalDetails';
import Notifications from './Notifications';
import Projects from './Projects';
import { currentUser } from '../../utilities/auth';
import BackdropModal from '../../components/microComponents/backdropModal';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Profile = () => {
  const [accordionTab, setAccordionTab] = useState(1);
  const [user, setUser] = useState({});
  const [open, setOpen] = React.useState(false);

  const displayPages = (tab) => {
    switch (tab) {
    case 2:
      return <MyAccount />;
    case 3:
      return <WithdrawalDetails />;
    case 4:
      return <Transactions />;
    case 5:
      return <Notifications />;
    default:
      return <Projects />;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const modalContent = (
    <div>
      <h3 className="text-wema">Verify Your Profile</h3>
      <p>
        <span>you need to complete your </span>
        <Link to="/register">registration</Link>
        <span> to continue</span>
      </p>
    </div>
  );
  useEffect(() => {
    currentUser.then((result) => {
      if (result.status === 'Inactive') {
        handleOpen();
      } else if (result.status === 'Active' || result?.status === 1) {
        setUser({ ...result });
      }
    });
  }, [currentUser]);
  return (
    <div>
      {
        (user?.status === 'Active' || user?.status === 1)
          && (
            <div className="content">
              <div className="w-100 margin-center m-t-40 ">
                {/* <div className="login-form-container p-20"> */}
                <h3 className="bold text-dark">Profile</h3>
                <div className="d-flex border">
                  <div className={`p-md-2 accordion-div-2  ${accordionTab === 1 && 'is-focus'}`}>
                    <button
                      type="button"
                      className={` no-border bg-transparent  ${accordionTab === 1 ? ' text-wema' : 'text-muted'}`}
                      onClick={() => setAccordionTab(1)}
                    >
                      My Projects
                    </button>
                  </div>
                  <div className={`p-md-2 accordion-div-2  ${accordionTab === 2 && 'is-focus'}`}>
                    <button
                      type="button"
                      className={` no-border bg-transparent  ${accordionTab === 2 ? ' text-wema' : 'text-muted'}`}
                      onClick={() => setAccordionTab(2)}
                    >
                      My Profile
                    </button>
                  </div>
                  <div className={`p-md-2 accordion-div-2  ${accordionTab === 3 && 'is-focus'}`}>
                    <button
                      type="button"
                      className={` no-border bg-transparent  ${accordionTab === 3 ? ' text-wema' : 'text-muted'}`}
                      onClick={() => setAccordionTab(3)}
                    >
                      My Withdrawal Details
                    </button>
                  </div>
                  <div className={`p-md-2 accordion-div-2  ${accordionTab === 4 && 'is-focus'}`}>
                    <button
                      type="button"
                      className={` no-border bg-transparent  ${accordionTab === 4 ? ' text-wema' : 'text-muted'}`}
                      onClick={() => setAccordionTab(4)}
                    >
                      My Transactions
                    </button>
                  </div>
                  <div className={`p-md-2 accordion-div-2  ${accordionTab === 5 && 'is-focus'}`}>
                    <button
                      type="button"
                      className={` no-border bg-transparent  ${accordionTab === 5 ? ' text-wema' : 'text-muted'}`}
                      onClick={() => setAccordionTab(5)}
                    >
                      My Notifications
                    </button>
                  </div>

                </div>
                <div className="login-form ">
                  {displayPages(accordionTab)}
                  {/* <Transactions /> */}
                </div>
                {/* </div> */}
              </div>
              {/* <Modal
        className={show ? 'max-w-400 right top' : 'max-w-400 right top off'}
        content={modalTemplate}
      /> */}
            </div>
          )
      }
      <BackdropModal content={modalContent} handleClose={handleClose} open={open} />
    </div>
  );
};

export default Profile;
