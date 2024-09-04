import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  PieChart as AnalyticsIcon,
  ShoppingCart as ECommerceIcon,
  LocalAtm as BankingIcon,
  Flight as BookingIcon,
  InsertDriveFile as FileIcon
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    backgroundColor: '#2C2C2C',
    color: '#fff',
  },
  listItem: {
    '&amp;:hover': {
      backgroundColor: '#3C3C3C',
    },
  },
  listItemIcon: {
    color: '#fff',
  },
  listItemText: {
    color: '#fff',
  },
}));

const SidebarMenu = () => {
  const classes = useStyles();

  const menuItems = [
    { label: 'Home', icon: HomeIcon, path: '/' },
    { label: 'Search', icon: SearchIcon, path: '/search' },
    { label: 'Analytics', icon: AnalyticsIcon, path: '/analytics' },
    { label: 'E-Commerce', icon: ECommerceIcon, path: '/ecommerce' },
    { label: 'Banking', icon: BankingIcon, path: '/banking' },
    { label: 'Booking', icon: BookingIcon, path: '/booking' },
    { label: 'File', icon: FileIcon, path: '/file' },
  ];

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText primary={item.label} className={classes.listItemText} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SidebarMenu;