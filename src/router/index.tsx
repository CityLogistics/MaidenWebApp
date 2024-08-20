import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Login from "../pages/Login";
import DashBoard from "../pages/DashBoard";
import { routes } from "@/lib/Constants";
import OrderList from "@/pages/OrderList";
import NewOrderList from "@/pages/NewOrderList";
import NewDriverList from "@/pages/NewDriverList";
import DriverList from "@/pages/DriverList";
import Settings from "@/pages/Settings";

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.HOME,
  component: function Index() {
    return <Login />;
  },
});

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.DASHBOARD,

  component: function Index() {
    return <DashBoard />;
  },
});

export const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.ORDERS,
  component: function Index() {
    return <OrderList />;
  },
});

export const newOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.NEW_ORDERS,
  component: function Index() {
    return <NewOrderList />;
  },
});

export const driversRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.DRIVERS,
  component: function Index() {
    return <DriverList />;
  },
});

export const newDriversRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.NEW_DRIVERS,
  component: function Index() {
    return <NewDriverList />;
  },
});

export const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.SETTINGS,
  component: function Index() {
    return <Settings />;
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  ordersRoute,
  newOrdersRoute,
  driversRoute,
  newDriversRoute,
  settingsRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
