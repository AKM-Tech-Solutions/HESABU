import { BsBoxSeam } from "react-icons/bs";
import { FiBarChart } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import { GoGraph } from "react-icons/go";

export const productsGrid = [
  {
    field: "date",
    headerText: "Date",
    width: "135",
    textAlign: "Center",
  },
  {
    field: "name",
    headerText: "Products Name",
    width: "135",
    textAlign: "Center",
  },
  {
    field: "catId",
    headerText: "Category ID",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "defaultPrice",
    headerText: "Default Price",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "quantity",
    headerText: "Quantity",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "total",
    headerText: "Total",
    width: "135",
    textAlign: "Center",
  },
];
export const transactionsGrid = [
  {
    field: "date",
    headerText: "Date",
    width: "135",
    textAlign: "Center",
  },
  {
    field: "name",
    headerText: "Products Name",
    width: "135",
    textAlign: "Center",
  },
  {
    field: "quantity",
    headerText: "Quantity",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "total",
    headerText: "Total",
    width: "135",
    textAlign: "Center",
  },
];

export const categoriesGrid = [
  {
    field: "image",
    headerText: "Category Image",
    template: (props) => {
      if (props.image) {
        return `<img src="${props.image}" alt="${props.name}" style="width:40px; height:40px; " />`;
      } else {
        return `<span>No Image</span>`;
      }
    },
    width: "120",

    textAlign: "Center",
  },
  {
    field: "name",
    headerText: "Category Name",
    width: "135",
    textAlign: "Center",
  },
  {
    field: "catId",
    headerText: "Category ID",
    width: "120",
    textAlign: "Center",
  },
];

export const salesSummaryData = [
  {
    title: "Sales Summary",
    icon: <GoGraph />,
    amount: "39,354",
    percentage: "-4%",

    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    pcColor: "red-600",
  },
  {
    title: "Net Profit",
    icon: <FiBarChart />,
    amount: "4,396",
    percentage: "+23%",

    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
    pcColor: "green-600",
  },
  {
    title: "Sales",
    icon: <BsBoxSeam />,
    amount: "42,339",
    percentage: "+38%",

    iconColor: "rgb(228, 106, 118)",
    iconBg: "rgb(255, 244, 229)",

    pcColor: "green-600",
  },
  {
    title: "Earnings",
    icon: <HiOutlineRefresh />,
    amount: "39,354",
    percentage: "-12%",

    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "red-600",
  },
];

// graph for the dashboard
export const graphData = [
  { month: "Jan", stockIn: 10000, stockOut: 5000 },
  { month: "Feb", stockIn: 15000, stockOut: 7000 },
  { month: "Mar", stockIn: 20000, stockOut: 10000 },
  { month: "Apr", stockIn: 25000, stockOut: 15000 },
  { month: "May", stockIn: 8000, stockOut: 4000 },
  { month: "Jun", stockIn: 12000, stockOut: 5000 },
  { month: "Jul", stockIn: 17000, stockOut: 9000 },
  { month: "Aug", stockIn: 22000, stockOut: 11000 },
  { month: "Sep", stockIn: 20000, stockOut: 12000 },
  { month: "Oct", stockIn: 15000, stockOut: 8000 },
  { month: "Nov", stockIn: 18000, stockOut: 9000 },
  { month: "Dec", stockIn: 12000, stockOut: 6000 },
];

export const transactionsData = [
  {
    date: "01/01/2024",
    name: "Best",
    quantity: 200,
    total: 10000,
  },
  {
    date: "01/01/2024",
    name: "Chrome",
    quantity: 200,
    total: 10000,
  },
  {
    date: "01/01/2024",
    name: "KC",
    quantity: 200,
    total: 10000,
  },
  {
    date: "01/01/2024",
    name: "KK",
    quantity: 200,
    total: 10000,
  },
  {
    date: "01/01/2024",
    name: "Smirnoff",
    quantity: 200,
    total: 10000,
  },
  {
    date: "01/01/2024",
    name: "Gilbeys",
    quantity: 200,
    total: 10000,
  },
  {
    date: "01/01/2024",
    name: "Captain morgan",
    quantity: 200,
    total: 10000,
  },
  {
    date: "01/01/2024",
    name: "Geaneral Meakins",
    quantity: 200,
    total: 10000,
  },
  {
    date: "01/01/2024",
    name: "Keg",
    quantity: 200,
    total: 10000,
  },
  {
    date: "01/01/2024",
    name: "Black & White",
    quantity: 200,
    total: 10000,
  },
  {
    date: "01/01/2024",
    name: "Legend",
    quantity: 200,
    total: 10000,
  },
];
