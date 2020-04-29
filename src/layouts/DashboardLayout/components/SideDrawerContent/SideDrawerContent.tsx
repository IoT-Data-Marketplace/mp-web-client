import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUserOutlined';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LocationIcon from '@material-ui/icons/LocationCity';
import DeviceIcon from '@material-ui/icons/DeviceHub';
import { Box, Link, List, Typography } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Divider from '@material-ui/core/Divider';
import { Users as UsersIcon } from 'react-feather';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../../state/interfaces/storeState';

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
    subheader: 'Search For Data',
    items: [
      {
        title: 'By Location',
        icon: LocationIcon,
        href: '/app/search/location',
      },
      {
        title: 'By Sensor Type',
        icon: DeviceIcon,
        href: '/app/management/streams',
      },
    ],
  },
  {
    subheader: 'Management',
    items: [
      {
        title: 'Streams',
        icon: UsersIcon,
        href: '/app/management/streams',
      },
    ],
  },
];

function renderNavItems(config: NavBarConfig[]) {
  return config.map((itemGroup, index) => (
    <>
      <Typography key={index} variant="h5">
        {itemGroup.subheader}
      </Typography>
      <List disablePadding>
        {itemGroup.items.map((item, index2) => (
          <ListItem button>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </>
  ));
}

const SideDrawerContent = () => {
  const { name } = useSelector((state: StoreState) => state.dataStreamEntity);
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box p={2}>
          <Box display="flex" justifyContent="center">
            <RouterLink to="/app/account">
              <VerifiedUserIcon />
            </RouterLink>
          </Box>
          <Box mt={2} textAlign="center">
            <Link
              component={RouterLink}
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {name}
            </Link>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>{renderNavItems(navBarConfig)}</Box>
        <Divider />
      </PerfectScrollbar>
    </Box>
  );
};

export { SideDrawerContent as default };
