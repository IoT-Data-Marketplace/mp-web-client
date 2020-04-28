import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Main from './layouts/Main/MainLayout';
import SellDashboardLayout from './layouts/SellDashboardLayout/SellDashboardLayout';
import BuyDashboardLayout from './layouts/BuyDashboardLayout/BuyDashboardLayout';
import LoadingScreen from './components/LoadingScreen';
import HomeView from './views/pages/HomeView';
import AuthGuard from './components/AuthGuard';
import GuestGuard from "./components/GuestGuard";

interface Rt {
  exact?: boolean;
  path?: string;
  component?: any;
  guard?: any;
  layout?: any;
  routes?: Rt[];
}

const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/home" />,
  },
  {
    exact: true,
    path: '/404',
    layout: Main,
    component: lazy(() => import('./views/pages/Error404View')),
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('./views/auth/LoginView')),
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/register',
    component: lazy(() => import('./views/auth/RegisterView')),
  },
  {
    exact: true,
    path: '/home',
    component: () => <HomeView />,
    layout: Main,
  },
  {
    path: '/app',
    guard: AuthGuard,
    routes: [
      {
        path: '/app/sell',
        layout: SellDashboardLayout,
        routes: [
          {
            exact: true,
            path: '/app/sell/dashboard',
            component: () => <div>sell dashboard</div>,
          },
          {
            component: () => <Redirect to="/404" />,
          },
        ],
      },
      {
        path: '/app/buy',
        layout: BuyDashboardLayout,
        routes: [
          {
            exact: true,
            path: '/app/buy/dashboard',
            component: () => <div>buy dashboard</div>,
          },
          {
            component: () => <Redirect to="/404" />,
          },
        ],
      },
      {
        component: () => <Redirect to="/404" />,
      },
    ],
  },
  {
    exact: false,
    path: '*',
    component: () => <Redirect to="/404" />,
    layout: Main,
  },
];

const renderRoutes = (routes: Rt[]) =>
  routes ? (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, index) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;

          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  ) : null;

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
