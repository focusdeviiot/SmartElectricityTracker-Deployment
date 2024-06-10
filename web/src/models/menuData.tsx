import { Role } from "./role";
// import { TbZoomMoney } from "react-icons/tb";
import { MdSensors } from "react-icons/md";
import { MdOutlineElectricMeter } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { MdManageAccounts } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
// import { MdDeviceHub } from "react-icons/md";
// import { IoIosPricetags } from "react-icons/io";

export interface MenuItem {
  icon?: JSX.Element;
  key: string;
  title: string;
  path: string;
  role?: Role[];
  layout?: boolean;
  isNotShow?: boolean;
  children?: MenuItem[];
}

export const menuData: MenuItem[] = [
  {
    icon: <MdSensors className="w-5 h-5 text-primary" />,
    key: "home",
    title: "Electricity Tracker",
    path: "",
    layout: true,
    role: [Role.USER, Role.ADMIN],
  },
  // {
  //     icon: <MdSensors className="w-5 h-5 text-primary" />,
  //     title: "View bill",
  //     layout: true,
  //     path: "view-bill",
  //     role: [Role.USER, Role.ADMIN]
  // },
  {
    icon: <TbReportAnalytics className="w-5 h-5 text-gray-500" />,
    key: "report",
    title: "Report",
    path: "report",
    layout: true,
    role: [Role.USER, Role.ADMIN],
    children: [
      {
        icon: <MdOutlineElectricMeter className="w-5 h-5 text-primary" />,
        key: "volt-usage",
        title: "Volt usage",
        path: "volt-usage",
        layout: true,
        role: [Role.USER, Role.ADMIN],
      },
      {
        icon: <MdOutlineElectricMeter className="w-5 h-5 text-primary" />,
        key: "amp-usage",
        title: "Amp usage",
        path: "amp-usage",
        layout: true,
        role: [Role.USER, Role.ADMIN],
      },
      {
        icon: <MdOutlineElectricMeter className="w-5 h-5 text-primary" />,
        key: "watt-usage",
        title: "Watt usage",
        path: "watt-usage",
        layout: true,
        role: [Role.USER, Role.ADMIN],
      },
      // {
      //   icon: <TbZoomMoney className="w-5 h-5 text-primary" />,
      //   title: "Electricity bill",
      //   path: "electricity-bill-usage",
      // },
    ],
  },
  {
    icon: <MdManageAccounts className="w-5 h-5 text-gray-500" />,
    key: "admin",
    title: "Admin management",
    path: "admin",
    role: [Role.ADMIN],
    children: [
      {
        icon: <FaUserEdit className="w-5 h-5 text-primary" />,
        key: "users",
        title: "Users",
        path: "users",
        layout: true,
        role: [Role.ADMIN],
      },
      // {
      //   icon: <MdDeviceHub className="w-5 h-5 text-primary" />,
      //   key: "devices",
      //   title: "Devices",
      //   path: "device",
      //   layout: true,
      //   role: [Role.ADMIN],
      // },
      // {
      //   icon: <IoIosPricetags className="w-5 h-5 text-primary" />,
      //   title: "Price / Unit",
      //   path: "price-unit",
      // },
      // {
      //     title: "Electricity billing",
      //     path: "electricity-billing",
      // },
    ],
  },
  {
    key: "unauthorized",
    title: "Unauthorized",
    path: "unauthorized",
    isNotShow: true,
  },
  {
    key: "login",
    title: "Login",
    path: "login",
    isNotShow: true,
  },
  {
    key: "logout",
    title: "Logout",
    path: "logout",
    isNotShow: true,
  },
];
