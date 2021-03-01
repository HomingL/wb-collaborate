import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import SigninForm from '../src/components/auth/SigninForm';
import AuthFormLayout from '../src/components/auth/AuthFormLayout';

export default function Index() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          WB Collaborate
        </Typography>
        <Link href="/signin" color="secondary">
          Go to the Sign Up page
        </Link>
        <AuthFormLayout title='Sign In' >
          <SigninForm/>
        </AuthFormLayout>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
