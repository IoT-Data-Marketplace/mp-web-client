import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUserOutlined';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LocationIcon from '@material-ui/icons/LocationCity';
import DeviceIcon from '@material-ui/icons/DeviceHub';
import { Box, Link, List, makeStyles, Typography } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Divider from '@material-ui/core/Divider';
import { Users as UsersIcon } from 'react-feather';
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { StoreState } from '../../../../state/interfaces/storeState';
import { ROUTES } from '../../../../constants';

const useStyles = makeStyles((theme: any) => ({
  subheader: {
    // paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
  },
  navItemClassName: {
    // marginBottom: theme.spacing(1),
  },
}));

interface NavBarItem {
  title: string;
  icon: any;
  href: string;
}

interface NavBarConfig {
  subheader: string;
  items: NavBarItem[];
}

const navBarConfig = [
  {
    subheader: 'Search For Data Streams',
    items: [
      {
        title: 'By Location',
        icon: LocationIcon,
        href: ROUTES.SEARCH_DATA_STREAMS_BY_LOCATION,
      },
    ],
  },
  {
    subheader: 'Management',
    items: [
      {
        title: 'List Sensors',
        icon: UsersIcon,
        href: ROUTES.SENSORS,
      },
      {
        title: 'Register Sensor',
        icon: UsersIcon,
        href: ROUTES.REGISTER_SENSOR,
      },
    ],
  },
];

function renderNavItems(config: NavBarConfig[], subheaderClassName, navItemClassName) {
  return config.map((itemGroup) => (
    <div key={uuid()}>
      <Typography className={subheaderClassName} key={uuid()} variant="h5">
        {itemGroup.subheader}
      </Typography>
      <List disablePadding key={uuid()}>
        {itemGroup.items.map((item) => (
          <Link
            key={uuid()}
            className={navItemClassName}
            component={RouterLink}
            to={item.href}
            variant="h6"
            color="textSecondary"
            underline="none"
          >
            <ListItem button>
              <ListItemText primary={item.title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  ));
}

const SideDrawerContent = () => {
  const classes = useStyles();
  const { name } = useSelector((state: StoreState) => state.dataStreamEntity);
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box p={2}>
          <Box display="flex" justifyContent="center">
            <RouterLink to="/app">
              <VerifiedUserIcon />
            </RouterLink>
          </Box>
          <Box mt={2} textAlign="center">
            <Link component={RouterLink} to="/app" variant="h5" color="textPrimary" underline="none">
              {name}
            </Link>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>{renderNavItems(navBarConfig, classes.subheader, classes.navItemClassName)}</Box>
        <Divider />
      </PerfectScrollbar>
    </Box>
  );
};

export { SideDrawerContent as default };
