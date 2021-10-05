import React, { useEffect, useState } from 'react';
import {
  MdExplore, RiLoginCircleLine, RiLogoutCircleLine, SiGnuprivacyguard
} from 'react-icons/all';
import { useSelector } from 'react-redux';
import { currentUser, logout } from '../utilities/auth';
import { notifications } from '../redux/actions/profileActions';
import {stringDoesNotExist} from "../utilities/stringOperations";

/**
 * @param {array} menu
 * */

const UseLeftHeader = ({ menu }) => {
  const store = useSelector((state) => state.common.leftHeader);

  const [leftMenu, setLeftMenu] = useState([
    {
      name: 'Home',
      icon: <MdExplore />,
      to: '/explore'
    },
    {
      name: 'About',
      icon: <RiLoginCircleLine />,
      to: '/login'
    },
    {
      name: 'Services',
      icon: <SiGnuprivacyguard />,
      to: '/register'
    },
    {
      name: 'Learning',
      icon: <SiGnuprivacyguard />,
      to: '/register'
    },
    {
      name: 'career',
      icon: <SiGnuprivacyguard />,
      to: '/register'
    },
    {
      name: 'Contacts',
      icon: <SiGnuprivacyguard />,
      to: '/register'
    }
  ]);

  useEffect(() => {
    currentUser.then((result) => {
      if (!stringDoesNotExist(result?.id)) {
        setLeftMenu([
          ...store?.text
        ]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
};
