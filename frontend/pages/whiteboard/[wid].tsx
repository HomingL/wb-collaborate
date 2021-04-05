import React, { useEffect, useState } from 'react'
import { WBProvider } from '../../src/components/whiteboard/wbContext'
import PeerConnecion from '../../src/components/whiteboard/peerData';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import WbCanvas from '../../src/components/whiteboard/wbCanvas';
import WbToolbar from '../../src/components/whiteboard/wbToolbar';
import WbSubTool from '../../src/components/whiteboard/wbSubTool';
import { useRouter } from 'next/router';
import { ChatProvider } from '../../src/components/chat/chatContext';
import Chat from '../../src/components/chat/chat';

interface WhiteboardProps {

}

const Whiteboard: React.FC<WhiteboardProps> = () => {
    const classes = useStyles();
    const router = useRouter()
    const [whiteboardId, setWhiteboardId] = useState<string>('');

    useEffect(() => {
        const { wid } = router.query;
        
        setWhiteboardId(wid as string);

    }, [router.query.wid])

    return (
        <PeerConnecion wid={whiteboardId}>
            <WBProvider>
                <ChatProvider>
                    <Grid container justify='space-between'>
                        <Grid item xs={12}>
                            <WbToolbar />
                        </Grid>

                        <Grid container justify='space-between'>
                            <Grid item xs={1}>
                                <WbSubTool />
                            </Grid>

                            <Grid item xs={11}>
                                <WbCanvas />
                            </Grid> 
                        </Grid>

                        <Grid container justify="flex-end" className={classes.chat}>
                            <Chat />
                        </Grid>
                    </Grid>
                </ChatProvider>
            </WBProvider>
        </PeerConnecion>
    );
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        chat: {
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: 'fit-content',
        },
    }),
);

export default Whiteboard;