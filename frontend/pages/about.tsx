import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, Toolbar, Grid } from '@material-ui/core';
// import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import Copyright from '../src/Copyright';

export default function About() {
  const classes = useStyles();
  return (
    <Container maxWidth='md'>
      <Toolbar component="nav" className={classes.toolbar}>
        <Link href="/" underline='hover'>Home</Link>
      </Toolbar>  
      <Grid container direction='column' spacing={10}>
        <Grid item xs={12} alignItems='center'>
          <Typography variant="h4" component="h1" gutterBottom>
            About Us
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='h5'>
          Our web application aims to provide a collaborative platform that allows multiple users to freedraw, add text and to draw diagrams on a whiteboard synchronously.
          </Typography>
        </Grid>
        <Grid item>
        <Typography variant="h4" component="h1" gutterBottom>
            Team
          </Typography>
        </Grid>
        <Grid item container justify='space-between'>
          <Grid item>
            <Link href='https://homingl.github.io/'>
            <Typography variant='subtitle2'>
              Hongming Li
            </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link href='https://www.linkedin.com/in/diego-he-ab5926163/'>
            <Typography variant='subtitle2'>
              Diego He
            </Typography>
            </Link>
            
          </Grid>
          <Grid item>
          <Link href='https://www.linkedin.com/in/hensonchen/'>
            <Typography variant='subtitle2'> Henson Chen </Typography>
          </Link>
          </Grid>
        </Grid>
        {/* <Link href="/">Go to the main page</Link> */}
        <Grid item ><Copyright /></Grid>
      </Grid>
    </Container>
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
