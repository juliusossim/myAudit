import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CgMenuMotion } from 'react-icons/all';
import Button from '@material-ui/core/Button';
import MyAccount from './MyAccount';
import Transactions from './Transactions';
import WithdrawalDetails from './WithdrawalDetails';
import Notifications from './Notifications';
import Projects from './Projects';
import { currentUser } from '../../utilities/auth';
import BackdropModal from '../../components/microComponents/backdropModal';
import CollapsedBreadcrumbs from '../../layouts/Breadcrumb';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Profile = () => {
  const [accordionTab, setAccordionTab] = useState(1);
  const [user, setUser] = useState({});
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [current, setCurrent] = React.useState('My Acount');

  const displayPages = (tab) => {
    switch (tab) {
    case 2:
      return <Projects setCurrent={setCurrent} />;
    case 3:
      return <WithdrawalDetails setCurrent={setCurrent} />;
    case 4:
      return <Transactions setCurrent={setCurrent} />;
    case 5:

      return <Notifications setCurrent={setCurrent} />;
    default:
      return <MyAccount setCurrent={setCurrent} />;
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
      if (result?.status === 'Inactive') {
        handleOpen();
      } else if (result?.status === 'Active' || result?.status === 1) {
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
              <div className="row">
                <CollapsedBreadcrumbs max={2} current={current} prevs={[{ name: 'My Account', to: '/me' }]} />
              </div>
              <div className="w-100 m-t-40">
                {/* <div className="login-form-container p-20"> */}
                <div className="d-flex justify-content-between">
                  <h3 className="bold text-dark">Overview</h3>
                  <Button className="float-right d-md-none btn-plain text-wema" type="button" onClick={() => setShow(!show)}>
                    <CgMenuMotion />
                  </Button>
                </div>
                <div className="d-md-flex py-2 border-1 d-none d-lg-flex d-xl-flex">
                  <div className={`p-md-2 accordion-div-2  ${accordionTab === 1 && 'is-focus'}`}>
                    <button
                      type="button"
                      className={` no-border bg-transparent  ${accordionTab === 1 ? ' text-wema' : 'text-muted'}`}
                      onClick={() => setAccordionTab(1)}
                    >
                      Profile
                    </button>
                  </div>
                  <div className={`p-md-2 accordion-div-2  ${accordionTab === 2 && 'is-focus'}`}>
                    <button
                      type="button"
                      className={` no-border bg-transparent  ${accordionTab === 2 ? ' text-wema' : 'text-muted'}`}
                      onClick={() => setAccordionTab(2)}
                    >
                      Projects
                    </button>
                  </div>
                  <div className={`p-md-2 accordion-div-2  ${accordionTab === 3 && 'is-focus'}`}>
                    <button
                      type="button"
                      className={` no-border bg-transparent  ${accordionTab === 3 ? ' text-wema' : 'text-muted'}`}
                      onClick={() => setAccordionTab(3)}
                    >
                      Withdrawal Details
                    </button>
                  </div>
                  <div className={`p-md-2 accordion-div-2  ${accordionTab === 4 && 'is-focus'}`}>
                    <button
                      type="button"
                      className={` no-border bg-transparent  ${accordionTab === 4 ? ' text-wema' : 'text-muted'}`}
                      onClick={() => setAccordionTab(4)}
                    >
                      Transactions
                    </button>
                  </div>
                  <div className={`p-md-2 accordion-div-2  ${accordionTab === 5 && 'is-focus'}`}>
                    <button
                      type="button"
                      className={` no-border bg-transparent  ${accordionTab === 5 ? ' text-wema' : 'text-muted'}`}
                      onClick={() => setAccordionTab(5)}
                    >
                      Notifications
                    </button>
                  </div>
                </div>
                <div className={show ? 'py-2 border-1' : 'd-none'}>
                  {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
                  <div
                    onClick={() => setShow(false)}
                    role="button"
                    onKeyUp={() => show}
                    className={`p-md-2 accordion-div-2   ${accordionTab === 1 && 'is-focus'}`}
                  >
                    <button
                      type="button"
                      className={` no-border bg-transparent  ${accordionTab === 1 ? ' text-wema' : 'text-muted'}`}
                      onClick={() => setAccordionTab(1)}
                    >
                      Projects
                    </button>
                  </div>
                  {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
                  <div
                    onClick={() => setShow(false)}
                    role="button"
                    onKeyUp={() => show}
                    className={`p-md-2 accordion-div-2   ${accordionTab === 2 && 'is-focus'}`}
                  >
                    <button
                      type="button"
                      className={` no-border bg-transparent  ${accordionTab === 2 ? ' text-wema' : 'text-muted'}`}
                      onClick={() => setAccordionTab(2)}
                    >
                      Profile
                    </button>
                  </div>
                  {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
                  <div
                    onClick={() => setShow(false)}
                    role="button"
                    onKeyUp={() => show}
                    className={`p-md-2 accordion-div-2   ${accordionTab === 3 && 'is-focus'}`}
                  >
                    <button
                      type="button"
                      className={` no-border bg-transparent  ${accordionTab === 3 ? ' text-wema' : 'text-muted'}`}
                      onClick={() => setAccordionTab(3)}
                    >
                      Withdrawal Details
                    </button>
                  </div>
                  {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
                  <div
                    onClick={() => setShow(false)}
                    role="button"
                    onKeyUp={() => show}
                    className={`p-md-2 accordion-div-2   ${accordionTab === 4 && 'is-focus'}`}
                  >
                    <button
                      type="button"
                      className={` no-border bg-transparent  ${accordionTab === 4 ? ' text-wema' : 'text-muted'}`}
                      onClick={() => setAccordionTab(4)}
                    >
                      Transactions
                    </button>
                  </div>
                  {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
                  <div
                    onClick={() => setShow(false)}
                    role="button"
                    onKeyUp={() => show}
                    className={`p-md-2 accordion-div-2   ${accordionTab === 5 && 'is-focus'}`}
                  >
                    <button
                      type="button"
                      className={` no-border bg-transparent  ${accordionTab === 5 ? ' text-wema' : 'text-muted'}`}
                      onClick={() => setAccordionTab(5)}
                    >
                      Notifications
                    </button>
                  </div>
                </div>
                <div className="login-form">
                  <div className="h-max-200">
                    {displayPages(accordionTab)}
                  </div>
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
