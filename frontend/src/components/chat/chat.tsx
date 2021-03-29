import React, {useState} from 'react';
import { Grid, Divider, TextField, Fab, IconButton, ClickAwayListener, Portal } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import SendIcon from '@material-ui/icons/Send';
import ChatIcon from '@material-ui/icons/Chat';
import { useChatContext } from './chatContext';
import Message from './message';
import { ContactSupportOutlined } from '@material-ui/icons';

const Chat: React.FC = () => {
    const classes = useStyles();
    // const { messages, setMessages} = useChatContext();
    const [open, setOpen] = useState<boolean>(false);

    const messages = [{"message":"hellow", "user": "Diego", "time": "9-9"}]
    
    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const addMessage = (text: any) => {
        console.log(text);
        const msg = {text, user: "Diego" }
        messages.push(msg);
    }

    return(
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.chatBox}>
                { open ? (
                <Grid item xs={12} className={classes.messageBox}>
                    <List className={classes.messageArea}>
                        {messages.map(msg =>{
                            return <Message key={msg.time} user={msg.user} message={msg.message} time={msg.time}/>
                        })}
                    </List>
                    <Divider />
                    <Grid container style={{padding: '20px'}}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" label="TextField" multiline={true} fullWidth/>
                        </Grid>
                        <Grid item xs={1} align="right">
                            <Fab color="primary" aria-label="add" onclick={addMessage}>
                                <SendIcon/>
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
                ) : ""}
                <Fab color="primary" aria-label="add" onClick={handleClick}>
                    <ChatIcon />
                </Fab>
            </div>
        </ClickAwayListener>
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
    messageArea: {
        border: '1px solid black',
    },
    chatBox:{
        height: 'auto',
        weigth: 'auto',
        overflowY: 'auto',
        overflowX: 'auto',
    },
    messageBox:{
        position: 'absolute',
        top: theme.spacing(50),
        left: theme.spacing(50),
    }
  }),
);

export default Chat;