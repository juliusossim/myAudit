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
    to: '/app/dashboard',
    children: [
      {
        parent: 'dashboard',
        name: 'dashboard',
        icon: <RiDashboardLine />,
        to: '/dashboard'
      },
      {
        parent: 'dashboard',
        name: 'Complete Profile',
        icon: <RiDashboardLine />,
        to: '/complete-registration'
      },
      {
        parent: 'dashboard',
        name: 'Send Invite',
        icon: <RiDashboardLine />,
        to: '/send-invite'
      }
    ]
  },
  {
    name: 'engagement',
    icon: <BsFolder />,
    to: '/app/engagement',
    children: [
      {
        parent: 'engagement',
        name: 'New engagement',
        icon: <BsFolder />,
        to: '/new-engagement'
      }
    ]
  },
  {
    name: 'team',
    icon: <MdPersonOutline />,
    to: '/app/team',
    children: [
      {
        parent: 'Team Members',
        name: 'New engagement',
        icon: <BsFolder />,
        to: '/new-engagement'
      }
    ]
  },
  {
    name: 'settings',
    icon: <RiSettings2Line />,
    to: '/app/settings',
    children: [
      {
        parent: 'Settings',
        name: 'New engagement',
        icon: <BsFolder />,
        to: '/new-engagement'
      }
    ]
  },
  {
    name: 'clients',
    icon: <AiOutlineUsergroupAdd />,
    to: '/app/clients'
  },
  {
    name: 'notifications',
    icon: <MdNotificationsNone />,
    to: '/app/notifications',
    children: [
      {
        parent: 'Notifications',
        name: 'New engagement',
        icon: <BsFolder />,
        to: '/new-engagement'
      }
    ]
  },
  {
    name: 'home',
    icon: <AiOutlineHome />,
    to: '/home'
  }
];
export default miniMenu;
