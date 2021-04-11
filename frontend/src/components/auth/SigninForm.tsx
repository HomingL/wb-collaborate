import React, { useState } from 'react';
import { Button, Grid, TextField, Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { SignInValidationSchema } from './AuthValidationSchema';
import { useSigninMutation } from '../../generated/apolloComponents';
import { useRouter } from 'next/router';
import Link from '../../Link';
import { setToken } from '../../utils/token';
import ErrorMessage from '../dialog/ErrorMessage';

const SigninForm: React.FC = () => {
  const [badLogin, setBadLogin] = useState<boolean>(false);
  const classes = useStyles();
  const router = useRouter();
  const [signinMutation] = useSigninMutation({
    variables: {
       email: '',
       password: ''
    },
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object(SignInValidationSchema),
    onSubmit: (values) => {
      signinMutation({ variables: values }).then((res) => {
        setBadLogin(false);
        const uid = res.data?.Signin.user.id;
        const token = res.data?.Signin.token;
        if (token) setToken(token);
        router.push(`/workspace/${uid}`);
      }).catch(() =>{
        setBadLogin(true);
      })
    },
  });
  return (
    <>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <ErrorMessage occur={badLogin} onClose={() => setBadLogin(false)}>
          Incorrect email or password!
        </ErrorMessage>
        <TextField
          variant="outlined"
          margin="normal"
          required
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
        <TextField
          variant="outlined"
          margin="normal"
          required
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

const useStyles = makeStyles((theme:Theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default SigninForm