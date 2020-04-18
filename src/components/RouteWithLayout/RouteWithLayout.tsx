import React from 'react';
import { Route } from 'react-router-dom';
import Main from '../../layouts/Main/Main';

interface Props {
  component?: React.ReactNode;
  layout: typeof Main;
  path: string;
}

const RouteWithLayout = (props: Props) => {
  const { layout, component, ...rest } = props;

  return <Route {...rest} render={(matchProps) => <Main>{component}</Main>} />;
};

export default RouteWithLayout;
