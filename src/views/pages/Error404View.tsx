import React from 'react';
import {
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Page from '../../components/Page';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.dark,
      minHeight: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(3),
      paddingTop: 80,
      paddingBottom: 80,
    },
    image: {
      maxWidth: '100%',
      width: 560,
      maxHeight: 300,
      height: 'auto',
    },
  })
);

function Error404View() {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Page className={classes.root} title="404: Not found">
      <Container maxWidth="lg">
        <Typography
          align="center"
          variant={mobileDevice ? 'h4' : 'h1'}
          color="textPrimary"
        >
          404: The page you are looking for isn’t here
        </Typography>
      </Container>
    </Page>
  );
}

export default Error404View;
