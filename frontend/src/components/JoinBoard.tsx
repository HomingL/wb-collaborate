import React, { useState } from 'react';
import { Grid, TextField } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Router from 'next/router';
import { useGetWhiteboardLazyQuery } from '../generated/apolloComponents';
import ErrorMessage from './dialog/ErrorMessage';

const JoinBoard: React.FC = () => {
  const classes = useStyles();
  const [badBoardRequest, setBadBoardRequest] = useState<boolean>(false);
  const [getWhiteboardQuery, {data, error}] = useGetWhiteboardLazyQuery({
    fetchPolicy: 'cache-and-network'
  });

  const validationSchema = yup.object({
    boardcode: yup
      .string(),
  });
  const formik = useFormik({
    initialValues: {
      boardcode: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      getWhiteboardQuery({
        variables: {
          id: values.boardcode
        },
      });
      if (error) setBadBoardRequest(true);
      if (data) Router.push(`/whiteboard/${values.boardcode}`);
    },
  });
  
  
  return (
    <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
      <ErrorMessage occur={badBoardRequest} onClose={() => setBadBoardRequest(false)}>
        This whiteboard does not exist!
      </ErrorMessage>
      <Grid container alignItems="center">
        <Grid item>
            <TextField
              variant="outlined"
              margin="dense"
              required
              id="boardcode"
              label="# Enter board id"
              value={formik.values.boardcode}
              onChange={formik.handleChange}
              error={formik.touched.boardcode && Boolean(formik.errors.boardcode)}
              helperText={formik.touched.boardcode && formik.errors.boardcode}
              name="boardcode"
              autoComplete="boardcode"
              autoFocus
            />
        </Grid>
        <Grid item>
          <Fab className={classes.submit} size="small" type="submit" color="secondary">
            <ArrowForwardIcon />
          </Fab>
        </Grid>
      </Grid>
    </form>
  );
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(0, 2, 0),
  },
}));

export default JoinBoard