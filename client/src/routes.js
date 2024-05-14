import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdPerson,
  MdHome,
  MdAdminPanelSettings,
  MdOutlineShoppingCart,
} from "react-icons/md";
//icons
import { GrTransaction } from "react-icons/gr";
// import { FaTruckLoading } from "react-icons/fa";
// import { TbReportSearch } from "react-icons/tb";
// import { IoCalendarNumber } from "react-icons/io5";

// Admin Imports
import MainDashboard from "views/admin/default";
import Inventory from "views/admin/marketplace";
import Transactions from "components/Transactions/Transactions";
// import Profile from "views/admin/profile";
// import RTL from "views/admin/rtl";
// import MiniCalendar from "components/calendar/MiniCalendar";
// import Suppliers from "components/Suppliers/Suppliers";
// import Reports from "components/Reports";

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
    name: "Transactions",
    layout: "/admin",
    path: "/transactions",
    icon: (
      <Icon as={GrTransaction} width="30px" height="30px" color="inherit" />
    ),
    component: Transactions,
  },
  // {
  //   name: "Suppliers",
  //   layout: "/admin",
  //   path: "/suppliers",
  //   icon: (
  //     <Icon as={FaTruckLoading} width="30px" height="30px" color="inherit" />
  //   ),
  //   component: Suppliers,
  // },
  // {
  //   name: "Reports",
  //   layout: "/admin",
  //   path: "/reports",
  //   icon: (
  //     <Icon as={TbReportSearch} width="30px" height="30px" color="inherit" />
  //   ),
  //   component: Reports,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width="30px" height="30px" color="inherit" />,
  //   component: Profile,
  // },
  // {
  //   name: "Calendar",
  //   layout: "/admin",
  //   path: "/minicalendar",
  //   icon: (
  //     <Icon as={IoCalendarNumber} width="30px" height="30px" color="inherit" />
  //   ),
  //   component: MiniCalendar,
  // },

  // {
  //   name: "Admin",
  //   layout: "/rtl",
  //   path: "/rtl-admin",
  //   icon: (
  //     <Icon
  //       as={MdAdminPanelSettings}
  //       width="30px"
  //       height="30px"
  //       color="inherit"
  //     />
  //   ),
  //   component: RTL,
  // },
];

export default routes;
