import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Collapse, Grid, IconButton, TextField } from '@material-ui/core';
import { makeStyles, Theme } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { SignupMutationVariables, useSignupMutation } from '../../generated/apolloComponents';
import { SignUpValidationSchema } from './AuthValidationSchema';
import Link from '../../Link';
import { Alert } from '@material-ui/lab';
import ErrorMessage from '../dialog/ErrorMessage';

const SignupForm: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const [badSignup, setBadSignup] = useState<boolean>(false);
  const [signupMutation] = useSignupMutation({
    variables: {
       email: '',
       password: '',
       name: '',
    },
  });
  // inserts name validation requirement on top of AuthValidationSchema
  const nameRequirement = yup
  .string()
  .max(30, 'Name should be of Maximum 30 characters length')
  .required('Name is required');
  SignUpValidationSchema.name = nameRequirement;
  const validationSchema = yup.object(
    SignUpValidationSchema
  );

  const formik = useFormik({
     initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: SignupMutationVariables) => {
      signupMutation({ variables: values }).then(() => {
        router.push('/');
      }
      ).catch(() =>{
        // throw new Error('Server Side Error for Signup');
        setBadSignup(true);
      })
    }
  })
  return (
    <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
      <ErrorMessage occur={badSignup} onClose={() => setBadSignup(false)}>
        This email has been used!
      </ErrorMessage>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            // className={classes.mdTextField}
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            name="name"
            label="Name"
            type="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            autoComplete="name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            // required
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
      <Link href="/" variant="body2">
        {"Already have an account? Sign in"}
      </Link>
    </form>
  );
}

// interface FormFields{
//   name: string;
//   email: string;
//   password: string;
// }

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default SignupForm