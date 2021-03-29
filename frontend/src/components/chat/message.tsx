import React from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export interface message{
    text: string
    user: string
    time: string
}

const Message: React.FC = ( {text, user, time} ) => {
    const classes = useStyles();


    return(
        <ListItem key={time}>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText className={classes.message} align="right" primary={text}></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText className={classes.message} align="right" secondary={user}></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    button: {
      marginRight: theme.spacing(1),
      color: "inherit",
    },
    title: {
      margin: theme.spacing(3),
    }
  }),
);
export default Message;