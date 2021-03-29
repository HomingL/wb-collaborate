import React from 'react';
import { Grid } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export interface message{
    message: string
    user: string
    time: string
}

const Message: React.FC = ( {message, user, time} ) => {
    return(
        <ListItem key={time}>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText align="right" primary={message}></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align="right" secondary={user}></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default Message;