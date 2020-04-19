import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Page from '../../../components/Page';
import Top from './Top';
import Features from './Features';
import SellBuy from './SellBuy';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

function HomeView() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Home">
      <>
        <Top />
        <Features />
        <SellBuy />
      </>
    </Page>
  );
}

export default HomeView;
