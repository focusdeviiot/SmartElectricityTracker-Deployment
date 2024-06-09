import { createBrowserRouter, RouteObject } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { MenuItem, menuData } from "./models/menuData";

import Layout from "./components/Layout/Layout";
import Login from "./pages/Auth/Login";
import Logout from "./pages/Auth/Logout";
import Home from "./pages/Home";
import Unauthorized from "./pages/Unauthorized";
import VoltUsage from "./pages/Report/VoltUsage";
import AmpUsage from "./pages/Report/AmpUsage";
import WattUsage from "./pages/Report/WattUsage";
import Users from "./pages/Admin/Users/Users";

const mapComponent = (item: MenuItem) => {
  let component: JSX.Element | null;

  switch (item.key) {
    case "home": // Map Key
      component = <Home />;
      break;
    case "login":
      component = <Login />;
      break;
    case "logout":
      component = <Logout />;
      break;
    case "unauthorized":
      component = <Unauthorized />;
      break;
    case "volt-usage":
      component = <VoltUsage />;
      break;
    case "amp-usage":
      component = <AmpUsage />;
      break;
    case "watt-usage":
      component = <WattUsage />;
      break;
    case "users":
      component = <Users />;
      break;
    default:
      component = <Home />;
  }

  component = item.layout ? <Layout>{component}</Layout> : component;

  component = item.role ? (
    <PrivateRoute requiredRole={item.role}>{component}</PrivateRoute>
  ) : (
    component
  );

  return component;
};

const mapMenu = (menuData: MenuItem[]) => {
  return menuData.map((item: MenuItem): RouteObject => {
    return {
      path: item.path,
      element: !item.children && mapComponent(item),
      children: mapMenu(item.children || []),
    };
  });
};

const routes: RouteObject[] = mapMenu(menuData);

const router = createBrowserRouter(routes);

export default router;
