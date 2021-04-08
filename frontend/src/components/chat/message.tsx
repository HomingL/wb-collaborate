import React from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { AccountCircle } from '@material-ui/icons';

export interface message{
    text: string
    user: string
    time: number
    self: boolean
}

const Message: React.FC<message> = ( {text, user, time, self} ) => {
  const classes = useStyles();
  let msgClass;
  if (self) msgClass = classes.selfMsg;
  return(
    <ListItem key={time}>
        <Grid container alignItems="flex-end" className={msgClass}>
            <Grid item xs={2}>
                <AccountCircle />
            </Grid>
            <Grid item xs={10}>
                <ListItemText primary={text}></ListItemText>
                <ListItemText secondary={user + " " + new Date(time).toLocaleTimeString()}></ListItemText>
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
    },
    selfMsg: {
      textAlign: 'right',
      flexFlow: 'row-reverse',
    },
  }),
);
export default Message;