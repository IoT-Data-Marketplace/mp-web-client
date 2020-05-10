import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { Breadcrumbs, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
  actionIcon: {
    marginRight: theme.spacing(1),
  },
}));

interface Props {
  className?: string;
  rest?: any;
}

function Header(props: Props) {
  const { className, rest } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={3} justify="space-between" className={clsx(classes.root, className)} {...rest}>
      <Grid item>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link variant="body1" color="inherit" to="/app" component={RouterLink}>
            Dashboard
          </Link>
          <Typography variant="body1" color="textPrimary">
            Streams
          </Typography>
          <Typography variant="body1" color="textPrimary">
            Location
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          Search Available Data Streams by Location
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Header;
