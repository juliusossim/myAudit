import {
  AiOutlineHome,
  AiOutlineUsergroupAdd,
  BsFolder,
  MdNotificationsNone,
  MdPersonOutline,
  RiDashboardLine,
  RiSettings2Line
} from 'react-icons/all';
import React from 'react';

const miniMenu = [
  {
    name: 'dashboard',
    icon: <RiDashboardLine />,
    to: '/app/dashboard'
  },
  {
    name: 'engagement',
    icon: <BsFolder />,
    to: '/app/engagement'
  },
  {
    name: 'team',
    icon: <MdPersonOutline />,
    to: '/app/team'
  },
  {
    name: 'settings',
    icon: <RiSettings2Line />,
    to: '/app/settings'
  },
  {
    name: 'clients',
    icon: <AiOutlineUsergroupAdd />,
    to: '/app/clients'
  },
  {
    name: 'notifications',
    icon: <MdNotificationsNone />,
    to: '/app/notifications'
  },
  {
    name: 'home',
    icon: <AiOutlineHome />,
    to: '/home'
  }
];
export default miniMenu;
