import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Drawer, List, ListItem, ListItemText, Button, Grid } from '@material-ui/core';


interface WorkspaceLayoutProps {
  children: React.ReactNode;
}


const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ children }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleProfile = (event: React.MouseEvent<HTMLElement>) => {
    console.log("event: ", event);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Drawer 
        open={true}
        variant="persistent"
        anchor="left"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          <ListItem>
            <Button variant="contained" color="secondary">
              + New whiteboard
            </Button>
          </ListItem>
          <ListItem button>
              <ListItemText primary={'My Notes'} />
            </ListItem>
            <ListItem button>
              <ListItemText primary={'Collaborative Notes'} />
            </ListItem>
        </List>
      </Drawer>
      <Grid container className={classes.appBar}>
        <Grid item xs={12}>
        <AppBar position="static" color={"primary"} >
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Workspace
            </Typography>
            
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfile}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Log out</MenuItem>
              </Menu>
            </div>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item className={classes.children} xs={12}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
}
const drawerWidth= 210

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer:{
      witdth: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    children:{
      margin: theme.spacing(4),
    },
  }),
);

export default WorkspaceLayout;