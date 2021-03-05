import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import SigninForm from '../src/components/auth/SigninForm';
import AuthFormLayout from '../src/components/auth/AuthFormLayout';
import JoinBoard from '../src/components/JoinBoard'
import { Grid, Toolbar } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const navitems = [
  {title: "How to use?", link: "/"},
  {title: "About us", link: "/"}
];

const nav = navitems.map((item) => 
  <Box m={3}>
    <Link href={item.link}>{item.title}</Link>
  </Box>
);

export default function Index() {
  const classes = useStyles();
  return (
    <Grid container className={classes.container} justify="space-between" direction="column" spacing={3}>

      <Grid item>
        <Toolbar component="nav" className={classes.toolbar}>
          {nav}
        </Toolbar>  
      </Grid>
      
      <Grid item container className={classes.contents} alignContent="center" alignItems="center" justify="center" spacing={3}>

        <Grid item >
            <Box px={3} ml={3} mr={8}>
              <Typography variant="h3" component="h3">
                WB Collaborate
              </Typography>
              <Typography variant="h5">
                Draw anything, share instantly
              </Typography>
              <JoinBoard/>
            </Box>
        </Grid>

        <Grid item >
          <AuthFormLayout title='Sign In' >
            <SigninForm/>
          </AuthFormLayout>
        </Grid>

      </Grid>

      <Grid item>
        <Copyright /> 
      </Grid>
      
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 5)
  },
  container: {
    minHeight: '100vh'
  },
  contents: {
    padding: theme.spacing(0, 5)
  }
}));

