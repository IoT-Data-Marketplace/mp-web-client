import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { StoreState } from '../state/interfaces/storeState';

interface Props {
  children?: React.ReactElement;
}

const GuestGuard = (props: Props) => {
  const { children } = props;
  const account = useSelector((state: StoreState) => state.account);

  if (account.isLoggedIn) {
    return <Redirect to="/app/account" />;
  }

  return children;
};

export default GuestGuard;
