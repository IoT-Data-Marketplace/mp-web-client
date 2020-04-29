import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { StoreState } from '../state/interfaces/storeState';

interface Props {
  children?: React.ReactElement;
}

const AuthGuard = (props: Props) => {
  const { children } = props;
  const account = useSelector((state: StoreState) => state.auth);

  if (!account.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return children;
};

export default AuthGuard;
