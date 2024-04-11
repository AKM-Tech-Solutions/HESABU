import React from "react";
import {
  FaHome,
  FaChartLine,
  FaFileInvoiceDollar,
  FaBalanceScaleRight,
} from "react-icons/fa";
import {Link} from "react-router-dom";


const menu = [
  {
    name: "HOME",
    path:"/Home",
   icon: FaHome,
    
  },
  {
    name: "NEW STOCK",
    path:"/Inventory",
    icon:FaFileInvoiceDollar,
  },
  {
    name: "BALANCE STOCK",
    path: "/MyBalance",
    icon:FaBalanceScaleRight,
    
  },
  {
    name: "REPORTS",
    path:"/REPORTS",
    icon:FaChartLine,
  },
];

function HeaderItem({ name, Icon }) {
  return (
    <div
      className="text-white flex items-center gap-3
    text-[15px] font-semibold cursor-pointer hover:underline
    underline-offset-8 mb-2"
    >
      <Icon />
      <h2 className="">{name}</h2>
      
    </div>
  );
}
//Header item not really needed but used to make code look cleaner





function Header() {
  return (
    <nav>
      
      <div className="flex items-center justify-between gap-8">
        <h1 className="text-white font-extrabold size-32">Inventory Manager</h1>
        {menu.map((item) => (
        <Link key={item.name} to={item.path} className={item.name}>
          <HeaderItem  name={item.name} Icon={item.icon} />
         </Link>
        ))}
      </div>
    </nav>
  );
}

export default Header;