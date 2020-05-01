import React from 'react';
import { Container, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import Page from '../../components/Page';

function Error404View() {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Page title="404: Not found">
      <Container maxWidth="lg">
        <Typography align="center" variant={mobileDevice ? 'h4' : 'h1'} color="textPrimary">
          404: The page you are looking for isn’t here
        </Typography>
      </Container>
    </Page>
  );
}

export default Error404View;
