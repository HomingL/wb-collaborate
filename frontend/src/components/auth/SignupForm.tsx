import React from 'react';
import { useRouter } from 'next/router';
import { Button, Grid, TextField } from '@material-ui/core';
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { SignupMutationVariables, useSignupMutation } from '../../generated/apolloComponents';

interface SignupFormProps {

}

const SignupForm: React.FC<SignupFormProps> = () => {
  const classes = useStyles();
  const router = useRouter();
  const [signupMutation, { error }] = useSignupMutation({
    variables: {
       email: '',
       password: '',
       name: '',
    },
  });
  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .max(30, 'Password should be of Maximum 30 characters length')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .required('Password is required'),
    name: yup
    .string()
    .max(30, 'Name should be of Maximum 30 characters length')
    .required('Name is required'),
  });

  const formik = useFormik({
     initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: SignupMutationVariables) => {
      alert(JSON.stringify(values, null, 2));
      signupMutation({ variables: values }).then(() => {
        router.push('/');
      }
      ).catch(() =>{
        throw new Error('Server Side Error for Signup');
      })
    }
  })
  return (
    <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
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