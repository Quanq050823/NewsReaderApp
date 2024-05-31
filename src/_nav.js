import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilBookmark,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Management Site',
  },
  {
    component: CNavItem,
    name: 'Article',
    to: '/Article',
    icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'News Sources',
    to: '/newsSource',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'News Topics',
  //   to: '/newsTopic',
  //   icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'User Account',
    to: '/userAccount',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]

export default _nav
