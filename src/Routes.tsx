import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Main from './layouts/Main/MainLayout';
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout';
import LoadingScreen from './components/LoadingScreen';
import HomeView from './views/pages/HomeView';
import AuthGuard from './components/AuthGuard';
import GuestGuard from './components/GuestGuard';
import { ROUTES } from './constants';

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
    path: ROUTES.ROOT,
    component: () => <Redirect to={ROUTES.HOME} />,
  },
  {
    exact: true,
    path: ROUTES.NOT_FOUND,
    layout: Main,
    component: lazy(() => import('./views/pages/Error404View')),
  },
  {
    exact: true,
    guard: GuestGuard,
    path: ROUTES.LOGIN,
    component: lazy(() => import('./views/auth/LoginView')),
  },
  {
    exact: true,
    guard: GuestGuard,
    path: ROUTES.REGISTER,
    component: lazy(() => import('./views/auth/RegisterView')),
  },
  {
    exact: true,
    path: ROUTES.HOME,
    component: () => <HomeView />,
    layout: Main,
  },
  {
    path: ROUTES.APP,
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: ROUTES.APP,
        component: () => <Redirect to={ROUTES.APP_OVERVIEW} />,
      },
      {
        exact: true,
        path: ROUTES.APP_OVERVIEW,
        component: lazy(() => import('./views/OverviewView')),
      },
      {
        exact: true,
        path: ROUTES.REGISTER_SENSOR,
        component: lazy(() => import('./views/app/sensors/RegisterSensorView')),
      },
      {
        exact: true,
        path: ROUTES.VIEW_SENSOR_FOR_ADDRESS,
        component: lazy(() => import('./views/app/sensors/SensorDetailsView')),
      },
      {
        component: () => <Redirect to={ROUTES.NOT_FOUND} />,
      },
    ],
  },
  {
    exact: false,
    path: '*',
    component: () => <Redirect to={ROUTES.NOT_FOUND} />,
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
                  <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>
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
