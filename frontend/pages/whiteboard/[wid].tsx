import React, { useEffect, useState } from 'react'
import { WBProvider } from '../../src/components/whiteboard/wbContext'
import PeerConnecion, from '../../src/components/whiteboard/peerData';
import { Grid } from '@material-ui/core';
import WbCanvas from '../../src/components/whiteboard/wbCanvas';
import WbToolbar from '../../src/components/whiteboard/wbToolbar';
import { useRouter } from 'next/router';
import { useUpdateWhiteboardMutation } from '../../src/generated/apolloComponents';

interface WhiteboardProps {

}

const Whiteboard: React.FC<WhiteboardProps> = () => {
    const router = useRouter()
    const [whiteboardId, setWhiteboardId] = useState<string>('');
    const [updateWhiteboardMutation] = useUpdateWhiteboardMutation({
        variables: {
            id: '',
            data: ''
        },
    });
    
    useEffect(() => {
        const { wid } = router.query;
        setWhiteboardId(wid as string);
        console.log('whiteboardId:', router.query);
    }, [router.query.wid])

    function saveCanv(stringifiedCanv:string, wid:string) {
        updateWhiteboardMutation({
            variables: {
                id: wid,
                data: stringifiedCanv
            },
        }).catch((err:any) => {
            console.log(err);
            throw new Error('Error cannot save canvas');
        });
    };
    
    return (
        <PeerConnecion wid={whiteboardId}>
            <WBProvider>
                <Grid container justify='space-between'>
                    <Grid item xs={12}>
                        <WbToolbar saveCanv={saveCanv} wid={whiteboardId}/>
                    </Grid>
                    <Grid item xs={12}>
                        <WbCanvas saveCanv={saveCanv} wid={whiteboardId}/>
                    </Grid> 
                </Grid>
            </WBProvider>
        </PeerConnecion>
    );
}

export default Whiteboard;