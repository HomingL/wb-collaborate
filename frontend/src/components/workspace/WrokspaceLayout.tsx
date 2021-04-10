import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Grid } from '@material-ui/core';
import WBLogo from '../static_components/WBCollaborate';
import { removeToken } from '../../utils/token';


interface WorkspaceLayoutProps {
  children: React.ReactNode;
}


const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ children }) => {
  const classes = useStyles();

  const handleLogout = () => {
    removeToken();
    if (typeof window !== 'undefined') window.location.replace("/");
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.appBar}>
        <Grid item xs={12}>
        <AppBar position="static" color={"primary"} >
          <Toolbar>
            <WBLogo />
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleLogout}
                  color="inherit"
                >
                    <ExitToAppIcon />
                </IconButton>
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
      // width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
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