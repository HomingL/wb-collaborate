import React from 'react'
import { Button, Grid, TextField } from '@material-ui/core';
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useFormik } from 'formik';
import * as yup from 'yup';

interface SignupFormProps {

}

const SignupForm: React.FC<SignupFormProps> = () => {
  const classes = useStyles();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    firstName: yup
    .string()
    .required('firstName is required'),
    lastName: yup
    .string()
    .required('lastName is required'),
  });

  const formik = useFormik({
     initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: FormFields) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2))
    }
  })
  return (
    <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            autoFocus
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            // className={classes.mdTextField}
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            name="lastName"
            label="Last Name"
            type="lastName"
            id="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            autoComplete="lastName"
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
    </form>
  );
}

interface FormFields{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

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