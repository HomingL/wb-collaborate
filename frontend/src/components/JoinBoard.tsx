import React from 'react';
import { Grid, TextField } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
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
            margin="dense"
            required
            id="boardcode"
            label="# Enter board id"
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