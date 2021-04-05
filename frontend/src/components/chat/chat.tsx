import React, {useEffect, useRef, useState} from 'react';
import { Grid, Divider, TextField, Fab, IconButton, CardHeader, InputBase } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import SendIcon from '@material-ui/icons/Send';
import ChatIcon from '@material-ui/icons/Chat';
import { useChatContext } from './chatContext';
import { usePBContext } from '../whiteboard/peerData';
import { AccountCircle, Close } from '@material-ui/icons';
import { useGetUserLazyQuery } from '../../generated/apolloComponents';
import Message from './message';
export interface message{
    text: string
    user: string
    time: number
    self: boolean
}

const Chat: React.FC = () => {
    const classes = useStyles();

    const { peerBroadcast, peerData } = usePBContext();
    const { messages, setMessages} = useChatContext();
    const [open, setOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [getUserQuery, { data, error }] = useGetUserLazyQuery({
        variables: {},
    });
    const [username, setUsername] = useState<string>("");
    const msgBottom = useRef<HTMLDivElement>(null);
    
    const handleClick = () => {
        setOpen(!open);
    };

    const addMessage = () => {
        if (!text) return;
        const texts = text?.match(/.{1,20}/g);

        let msgs = ""; 
        texts?.forEach((msg: string) => {
           msgs += msg + "\n";
        });
        
        const newMsg:message = {
            text: msgs, 
            user: username || "Guest", 
            time: Date.now(),
            self: true,
        };
        if (setMessages) setMessages([...messages, newMsg]);
        setText("");

        if (peerBroadcast) peerBroadcast(JSON.stringify({ chats: newMsg }));
    }

    useEffect(() => {
        getUserQuery({
            variables: {},
        });
    }, []);

    useEffect(() => {
        if (error || !data?.User.name) return;
        setUsername(data?.User.name);
    }, [data, error]);

    useEffect(() => {
        if (peerData) {
          try {
            const pData = JSON.parse(peerData);
            console.log('pData', pData);

            if (pData.chats) {
                pData.chats.self = false;
                if (setMessages) setMessages([...messages, pData.chats]);
            }
          } catch (err) {
            if (err instanceof SyntaxError) {
              console.log('peerData is not in JSON type', peerData);
            } else console.error(err);
          }
        }
    }, [peerData]);

    useEffect(() => {
        msgBottom.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return(
        <Grid container justify="flex-end" alignItems="flex-end">
            { open ? (
            <Grid item xs={12} className={classes.messageBox}>
                <CardHeader
                    className={classes.chatHeader}
                    color="secondary"
                    avatar={<AccountCircle />}
                    action={
                        <IconButton color="inherit" onClick={handleClick} aria-label="close">
                            <Close />
                        </IconButton>
                    }
                    title={<InputBase color="secondary" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your name" />}
                />
                <List className={classes.messageArea}>
                    {messages.map(msg => <Message key={msg.time} text={msg.text} user={msg.user} time={msg.time} self={msg.self} />)}
                    <div ref={msgBottom}></div>
                </List>
                <Divider />
                <Grid container spacing={1} alignItems="center" className={classes.textArea}>
                    <Grid item xs={10}>
                        <TextField color="secondary" variant="filled" value={text} onChange={(e) => setText(e.target.value)} label="Send messages" multiline={true} fullWidth/>
                    </Grid>
                    <Grid item xs={2}>
                        <Fab size="small" color="secondary" aria-label="add" onClick={addMessage}>
                            <SendIcon/>
                        </Fab>
                    </Grid>
                </Grid>
            </Grid>
            ) : ""}
            <Fab className={classes.toggleChat} color="secondary" aria-label="add" onClick={handleClick}>
                <ChatIcon />
            </Fab>
        </Grid>
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
      color: "inherit",
    },
    messageArea: {
        position: 'relative',
        width: '100%',
        height: '45vh',
        overflowY: 'auto',
    },
    textArea:{
        position: 'relative',
        padding: theme.spacing(1),
    },
    messageBox:{
        border: '1px solid ' + theme.palette.secondary.main,
        background: theme.palette.background.default,
        borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
        boxShadow: 'rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px',
        maxWidth: '300px',
    },
    chatHeader: {
        padding: '5px 20px',
        borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
        background: theme.palette.secondary.main,
        color: '#fff',
    },
    toggleChat: {
        margin: '1rem',
    },
    selfMsg: {
        textAlign: 'right',
        flexFlow: 'row-reverse',
    }
  }),
);

export default Chat;