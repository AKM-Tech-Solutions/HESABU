import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdAdminPanelSettings,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { GrTransaction } from "react-icons/gr";

import { FaTruckLoading } from "react-icons/fa";

import { IoCalendarNumber } from "react-icons/io5";

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";
import Inventory from "views/admin/marketplace";
import MiniCalendar from "components/calendar/MiniCalendar";
import Transactions from "components/Transactions/Transactions";
import Suppliers from "components/Suppliers/Suppliers";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="30px" height="30px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Inventory",
    layout: "/admin",
    path: "/-Inventory",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="30px"
        height="30px"
        color="inherit"
      />
    ),
    component: Inventory,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="30px" height="30px" color="inherit" />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Transactions",
    layout: "/admin",
    path: "/transactions",
    icon: (
      <Icon as={GrTransaction} width="30px" height="30px" color="inherit" />
    ),
    component: Transactions,
  },
  {
    name: "Suppliers",
    layout: "/admin",
    path: "/suppliers",
    icon: (
      <Icon as={FaTruckLoading} width="30px" height="30px" color="inherit" />
    ),
    component: Suppliers,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="30px" height="30px" color="inherit" />,
    component: Profile,
  },
  {
    name: "Calendar",
    layout: "/admin",
    path: "/minicalendar",
    icon: (
      <Icon as={IoCalendarNumber} width="30px" height="30px" color="inherit" />
    ),
    component: MiniCalendar,
  },

  {
    name: "Admin",
    layout: "/rtl",
    path: "/rtl-admin",
    icon: (
      <Icon
        as={MdAdminPanelSettings}
        width="30px"
        height="30px"
        color="inherit"
      />
    ),
    component: RTL,
  },
];

export default routes;
