import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
// import SigninForm from '../src/components/auth/SigninForm';
import SigninForm from '../pages/signin';
import AuthFormLayout from '../src/components/auth/AuthFormLayout';
import JoinBoard from '../src/components/JoinBoard'
import { Grid } from '@material-ui/core';

export default function Index() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h5" component="h1" gutterBottom>
          WB Collaborate
        </Typography>
        {/* <Link href="/signup" color="secondary">
          Go to the Sign Up page
        </Link> */}
        <Grid container alignItems="center" justify="center">
          <Grid item xs={7}>
            <Typography variant="h4" component="h4">
              Join existed board
            </Typography>
            <JoinBoard/>
          </Grid>
          <Grid item xs={5}>
            <AuthFormLayout title='Sign In' >
              <SigninForm/>
            </AuthFormLayout>
          </Grid>
        </Grid>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Box>
    </Container>
  );
}
