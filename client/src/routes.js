import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdAdminPanelSettings,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

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
    component: NFTMarketplace,
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
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="30px" height="30px" color="inherit" />,
    component: Profile,
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
