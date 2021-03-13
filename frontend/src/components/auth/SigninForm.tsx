import React from 'react';
import { Button, Checkbox, FormControlLabel, Grid, TextField, Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { SignInValidationSchema } from './AuthValidationSchema';
import { useSigninMutation } from '../../generated/apolloComponents';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Link from '../../Link';
// import { theme } from '../../theme';

interface SigninFormProps {

}

const SigninForm: React.FC<SigninFormProps> = () => {
  const classes = useStyles();
  const router = useRouter();
  const [signinMutation, { data }] = useSigninMutation({
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
      // alert(JSON.stringify(values, null, 2));
      signinMutation({ variables: values }).then((res) => {
        console.log(data);
        console.log(Cookies.get());
        const uid = res.data?.Signin.id;
        router.push(`/workspace/${uid}`);
      }).catch(() =>{
        throw new Error('Server Side Error for Signin');
      })
    },
  });
  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
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
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
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
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="/signup" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </form>
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