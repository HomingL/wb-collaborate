import React from 'react';
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Container, CssBaseline, Typography } from '@material-ui/core';
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