import React, { useEffect, useState } from 'react'
import { WBProvider } from '../../src/components/whiteboard/wbContext'
import PeerConnecion from '../../src/components/whiteboard/peerData';
import { CircularProgress, createStyles, Grid, makeStyles } from '@material-ui/core';
import WbCanvas from '../../src/components/whiteboard/wbCanvas';
import WbToolbar from '../../src/components/whiteboard/wbToolbar';
import WbSubTool from '../../src/components/whiteboard/wbSubTool';
import { useRouter } from 'next/router';
import { ChatProvider } from '../../src/components/chat/chatContext';
import Chat from '../../src/components/chat/chat';
import { useGetWhiteboardLazyQuery } from '../../src/generated/apolloComponents';

interface WhiteboardProps {

}

const Whiteboard: React.FC<WhiteboardProps> = () => {
    const classes = useStyles();
    const router = useRouter()
    const [whiteboardId, setWhiteboardId] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [getWhiteboardQuery, {data, error}] = useGetWhiteboardLazyQuery({
        fetchPolicy: 'cache-and-network'
    });

    useEffect(() => {
        const { wid } = router.query;
        setWhiteboardId(wid as string);
        getWhiteboardQuery({
            variables: {
               id: wid as string
            },
        });
    }, [router.query.wid]);
    
    useEffect(() => {
        if (data) console.log(data.GetWhiteboard);
        if (data) setLoading(false);
        if (error) router.push('/404');
    }, [data, error]);

    return (
        loading ?
        <Grid container alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
            <CircularProgress />
        </Grid> :
        <PeerConnecion wid={whiteboardId}>
            <WBProvider wid={whiteboardId}>
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
                                <WbCanvas wid={whiteboardId}/>
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

const useStyles = makeStyles(() => 
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