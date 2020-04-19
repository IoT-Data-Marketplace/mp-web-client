import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Main from './layouts/Main/Main';
import LoadingScreen from './components/LoadingScreen';

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
    path: '/home',
    component: () => <div>Hi there from home</div>,
    layout: Main,
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
