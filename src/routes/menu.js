import {
  AiOutlineAudit,
  AiOutlineHome,
  AiOutlineUsergroupAdd,
  BsFolder, IoBusinessOutline,
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
    name: 'clients',
    icon: <IoBusinessOutline />,
    to: '/app/clients'
  },
  {
    name: 'team',
    icon: <AiOutlineUsergroupAdd />,
    to: '/app/team'
  },
  {
    name: 'profile',
    icon: <MdPersonOutline />,
    to: '/app/profile'
  },
  {
    name: 'notifications',
    icon: <MdNotificationsNone />,
    to: '/app/notifications'
  },
  {
    name: 'settings',
    icon: <RiSettings2Line />,
    to: '/app/settings'
  },
  {
    name: 'home',
    icon: <AiOutlineHome />,
    to: '/home'
  }
];
export default miniMenu;
