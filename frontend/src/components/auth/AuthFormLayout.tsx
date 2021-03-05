import React from 'react';
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Container, CssBaseline, Typography, Box } from '@material-ui/core';
import Copyright from '../../Copyright';

interface AuthFormLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthFormLayout: React.FC<AuthFormLayoutProps> = ( { children, title} ) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {children}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default AuthFormLayout