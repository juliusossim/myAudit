import {
  BsFolder,
  MdNotificationsNone,
  MdPersonOutline,
  RiDashboardLine,
  RiSettings2Line
} from 'react-icons/all';
import React from 'react';

const miniMenu = [
  {
    name: 'Dashboard',
    icon: <RiDashboardLine />,
    children: [
      {
        parent: 'Dashboard',
        name: 'Dashboard',
        icon: <RiDashboardLine />,
        to: '/dashboard'
      },
      {
        parent: 'Dashboard',
        name: 'Complete Profile',
        icon: <RiDashboardLine />,
        to: '/complete-registration'
      },
      {
        parent: 'Dashboard',
        name: 'Send Invite',
        icon: <RiDashboardLine />,
        to: '/send-invite'
      }
    ]
  },
  {
    name: 'Engagement',
    icon: <BsFolder />,
    children: [
      {
        parent: 'Engagement',
        name: 'New Engagement',
        icon: <BsFolder />,
        to: '/new-engagement'
      }
    ]
  },
  {
    name: 'Team Members',
    icon: <MdPersonOutline />,
    children: [
      {
        parent: 'Team Members',
        name: 'New Engagement',
        icon: <BsFolder />,
        to: '/new-engagement'
      }
    ]
  },
  {
    name: 'Settings',
    icon: <RiSettings2Line />,
    children: [
      {
        parent: 'Settings',
        name: 'New Engagement',
        icon: <BsFolder />,
        to: '/new-engagement'
      }
    ]
  },
  {
    name: 'Notifications',
    icon: <MdNotificationsNone />,
    children: [
      {
        parent: 'Notifications',
        name: 'New Engagement',
        icon: <BsFolder />,
        to: '/new-engagement'
      }
    ]
  }
];
export default miniMenu;
