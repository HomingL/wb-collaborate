import React, {useState} from 'react';
import { Grid, Divider, TextField, Fab, IconButton, ClickAwayListener, Portal } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import ChatIcon from '@material-ui/icons/Chat';
import { useChatContext } from './chatContext';
export interface message{
    text: string
    user: string
    time: string
}

const Chat: React.FC = () => {
    const classes = useStyles();

    const { messages, setMessages} = useChatContext();
    const [open, setOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    
    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const addMessage = () => {
        let texts: string[] = text?.match(/.{1,20}/g);

        let msgs: string = ""; 
        texts?.forEach((msg: string) => {
           msgs += msg + "\n";
        });
        
        const msg = {text: msgs, user: "Diego"}

        setMessages([...messages, msg]);
        setText("");
    }

    return(
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.chatBox}>
                { open ? (
                <Grid item xs={12} className={classes.messageBox}>
                    <List className={classes.messageArea}>
                        {messages.map(msg =>{
                            return (
                                <ListItem key={msg.time}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <ListItemText align="right" primary={msg.text}></ListItemText>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ListItemText align="right" secondary={msg.user}></ListItemText>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            )
                        })}
                    </List>
                    <Divider />
                    <Grid container className={classes.textArea}>
                        <Grid item xs={10}>
                            <TextField value={text} onChange={(e) => setText(e.target.value)} label="TextField" multiline={true} fullWidth/>
                        </Grid>
                        <Grid item xs={2} align="right">
                            <Fab color="primary" aria-label="add" onClick={addMessage}>
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
        position: 'relative',
        padding: theme.spacing(2),
        width: '100%',
        height: '400px',
        overflowY: 'auto',
    },
    textArea:{
        position: 'relative',
        padding: theme.spacing(2),
    },
    chatBox:{
        margin: theme.spacing(3),
    },
    messageBox:{
        position: 'fixed',
        bottom: theme.spacing(10),
        right: theme.spacing(10),
        border: '1px solid black',
        background: "white",
        minWidth: "30%",
        maxWidth: "30%",
        minHeight: "50%",
        maxHeight: "50%",
    }
  }),
);

export default Chat;