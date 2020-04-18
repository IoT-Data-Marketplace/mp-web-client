import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LanguageIcon from '@material-ui/icons/Language';
import { connect } from 'react-redux';
import { toggleDrawer, Ui } from '../../../../state/actions';
import { StoreState } from '../../../../state/reducers';

const drawerWidth = 256;

interface Props {
  children?: React.ReactElement;
  ui: Ui;
  toggleDrawer: typeof toggleDrawer;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: theme.palette.primary.main,
    },
  })
);

const _SideDrawer = (props: Props) => {
  const classes = useStyles();

  const { ui } = props;

  const onToggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    props.toggleDrawer(open);
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={onToggleDrawer(false)}
      onKeyDown={onToggleDrawer(false)}
    >
      <List>
        {['Language'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <LanguageIcon /> : <LanguageIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        open={ui.isDrawerOpen}
        onClose={onToggleDrawer(false)}
        // onOpen={onToggleDrawer(true)}
      >
        {sideList()}
      </Drawer>
    </>
  );
};

const mapStateToProps = ({ ui }: StoreState) => {
  return { ui };
};

const SideDrawer = connect(mapStateToProps, { toggleDrawer })(_SideDrawer);

export { SideDrawer as default };
