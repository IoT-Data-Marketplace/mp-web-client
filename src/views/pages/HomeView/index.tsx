import React from 'react';
import Page from '../../../components/Page';
import Top from './Top';
import Features from './Features';
import SellBuy from './SellBuy';

function HomeView() {
  return (
    <Page title="Home">
      <>
        <Top />
        <Features />
        <SellBuy />
      </>
    </Page>
  );
}

export default HomeView;
