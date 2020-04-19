import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { StoreState } from '../interfaces';

interface Props {
  children?: React.ReactElement;
}

const GuestGuard = (props: Props) => {
  const { children } = props;
  const account = useSelector((state: StoreState) => state.account);

  if (account.user) {
    return <Redirect to="/app/account" />;
  }

  return children;
};

export default GuestGuard;