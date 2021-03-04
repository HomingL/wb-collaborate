import React from 'react';
import { Button, Checkbox, FormControlLabel, Grid, Input, Link, TextField } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from '@material-ui/core/styles';
interface SigninFormProps {

}

const JoinBoard: React.FC<SigninFormProps> = ({}) => {
  const classes = useStyles();
  return (
    <form className={classes.form} noValidate>
      <Grid container alignItems="center">
        <Grid item>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="boardcode"
            label="# Enter code"
            name="boardcode"
            autoComplete="boardcode"
            autoFocus
          />  
        </Grid>
        <Grid item>
          <Button type="submit" color="primary">
            <ArrowForwardIcon />
          </Button>
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
    margin: theme.spacing(3, 0, 2),
  },
}));

export default JoinBoard