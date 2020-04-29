import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation, matchPath } from 'react-router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUserOutlined';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LocationIcon from '@material-ui/icons/LocationCity';
import DeviceIcon from '@material-ui/icons/DeviceHub';
import {
  Box,
  Link,
  Typography,
  ListSubheader,
  List,
  SvgIconTypeMap,
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Divider from '@material-ui/core/Divider';
import {
  Briefcase as BriefcaseIcon,
  Calendar as CalendarIcon,
  ShoppingCart as ShoppingCartIcon,
  Folder as FolderIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  UserPlus as UserPlusIcon,
  Shield as ShieldIcon,
  AlertCircle as AlertCircleIcon,
  Trello as TrelloIcon,
  User as UserIcon,
  Layout as LayoutIcon,
  Edit as EditIcon,
  DollarSign as DollarSignIcon,
  Mail as MailIcon,
  MessageCircle as MessageCircleIcon,
  PieChart as PieChartIcon,
  Share2 as ShareIcon,
  Users as UsersIcon,
} from 'react-feather';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      // color: 'inherit',
      textDecoration: 'none',
    },
  })
);

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
        href: '/app/buy/search/location',
      },
      {
        title: 'By Sensor Type',
        icon: DeviceIcon,
        href: '/app/buy/management/streams',
      },
    ],
  },
  {
    subheader: 'Management',
    items: [
      {
        title: 'Streams',
        icon: UsersIcon,
        href: '/app/buy/management/streams',
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
  const classes = useStyles();
  const location = useLocation();
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
              Username
            </Link>
            <Typography variant="body2" color="textSecondary">
              user bio
            </Typography>
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
