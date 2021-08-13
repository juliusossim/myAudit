import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IoIosCreate,
  RiLoginCircleLine,
  RiLogoutCircleLine,
  RiNotification4Line, SiGnuprivacyguard
} from 'react-icons/all';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import Badge from '@material-ui/core/Badge';
import CrowdLogo from '../assets/images/crowd-funding-logo.png';
import User from '../assets/images/User.svg';
import Modal from '../components/microComponents/modal';
import SearchInput from '../components/form/inputs/search';
import { currentUser, logout } from '../utilities/auth';
import { notifications } from '../redux/actions/profileActions';
import SearchAppBar from '../components/ui/appBar';

const Header = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile.notifications);
  const [show, setShow] = useState(false);
  const [me, setMe] = useState(false);
  const [menu, setMenu] = useState([
    {
      name: 'sign in',
      icon: <RiLoginCircleLine />,
      to: '/login'
    },
    {
      name: 'sign up',
      icon: <SiGnuprivacyguard />,
      to: '/register'
    }
  ]);
  const [user, setUser] = useState({ loggedIn: false });
  const handleMe = () => {
    setShow(!show);
    setMe(true);
  };
  useEffect(() => {
    currentUser.then((result) => {
      if (result?.id !== undefined) {
        setUser({ loggedIn: true, details: result });
        dispatch(notifications());
        setMenu([
          {
            name: 'sign out',
            icon: <RiLogoutCircleLine />,
            action: () => logout('/', false)
          },
          {
            icon: <IoIosCreate />,
            name: <button type="button" className="btn">create project</button>,
            to: '/create-project'
          }
        ]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  useEffect(() => {
    if (store?.status === 'success') {
      setMenu([
        {
          name: 'sign out',
          icon: <RiLogoutCircleLine />,
          action: () => logout('/', false)
        },
        {
          count: store?.data?.data?.length,
          icon: <RiNotification4Line />,
          to: '/notifications'
        },
        {
          icon: <IoIosCreate />,
          name: <button type="button" className="btn">create project</button>,
          to: '/create-project'
        }
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.status]);

  return (
    <SearchAppBar
      logo={CrowdLogo}
      dp={user?.loggedIn && (
        <Link to="/me" className="mt-2">
          <Avatar src={User} alt="profile logo" />
        </Link>
      )}
      clss="px-14vw"
      menu={menu}
    />
    // <header>
    //   <div className="content space-between flex-v-center">
    //     <div className="header-left">
    //       <Link to="/" className="logo">
    //         <img src={CrowdLogo} alt="crowd funding logo" />
    //       </Link>
    //     </div>
    //     <div>
    //       <SearchInput label="Search" name="search" placeholder="Search" />
    //     </div>
    //     <div className="header-right">
    //       {
    //         user.loggedIn
    //           ? (
    //             <div className="d-flex">
    //               <Link to="/">
    //                 <button type="button" className="btn bg-transparent text-wema
    //                 center-center sign-in" onClick={() => logout('/', false)}>
    //                 <div>Sign Out</div></button>
    //               </Link>
    //               <Link to={{ pathname: '/create-project' }}>
    //                 <button className="btn " type="button">Start Project</button>
    //               </Link>
    //               <Link to="/me" className="size4 ml-md-1 radius50 bg-light
    //               flex-h-center border-wema p-1">
    //                 <Avatar src={User} alt="profile logo" />
    //
    //               </Link>
    //               <Link to="#">
    //                 <button type="button" className={`${show ? 'text-wema' : ''}
    //                 ml-md-1 d-flex no-border bg-transparent`} onClick={handleMe}>
    //                   <div className="bold mt-md-2">
    //                     {' '}
    //                     {user.details?.user_name}
    //                   </div>
    //                   {show ? <HiOutlineChevronUp className="mt-md-3" />
    //                     : <HiOutlineChevronDown className="mt-md-3" />}
    //                 </button>
    //               </Link>
    //               {
    //                 store?.status === 'success'
    //                 && (
    //                   <Link to="/me">
    //                     <h5 className="p-2">
    //                       <Badge badgeContent={store?.data?.data?.length} color="secondary">
    //                         <span className="text-wema">
    //                           <RiNotification4Line />
    //                         </span>
    //                       </Badge>
    //                     </h5>
    //                   </Link>
    //                 )
    //               }
    //
    //             </div>
    //           )
    //           : (
    //             <div className="d-flex">
    //               <Link to="/login"><div className="fit-max text-wema
    //               sign-in">Sign In</div></Link>
    //               <Link to="/register">
    //                 <button className="btn m-l-20" type="button">Sign Up</button>
    //               </Link>
    //             </div>
    //           )
    //       }
    //     </div>
    //   </div>
    //   {
    //     me && (
    //       <Modal
    //         className="max-w-200 profile-drop"
    //         content={(
    //           <div className="p-2">
    //             <Link to="/me" onClick={() => setShow(false)}>
    //               My Account
    //             </Link>
    //             <div>
    //               <button type="button" className="no-border bg-transparent"
    //               onClick={() => logout('/', true)}>
    //                 Logout
    //               </button>
    //             </div>
    //           </div>
    //         )}
    //         transition={show ? 'slide-bottom' : 'slide-out-blurred-top'}
    //       />
    //     )
    //   }
    // </header>
  );
};

export default Header;
