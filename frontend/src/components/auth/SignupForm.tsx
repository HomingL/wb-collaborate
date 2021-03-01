import React from 'react'
import { Button, Checkbox, FormControlLabel, Grid, Link, TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";


interface SignupFormProps {

}

const SignupForm: React.FC<SignupFormProps> = ({}) => {
  const classes = useStyles();
  return (
    <form className={classes.form} noValidate>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <TextField
            // className={classes.mdTextField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            autoFocus
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            // className={classes.mdTextField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            type="lastName"
            id="lastName"
            autoComplete="lastName"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign Up
      </Button>
    </form>
  );
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  // mdTextField:{
  //   // '& .MuiFormControl-root': {
  //   //   padding: theme.spacing(3, 0, 2),
  //   // }
  //   padding: theme.spacing(1),
  // }
}));

export default SignupForm