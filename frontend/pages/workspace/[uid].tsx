import React from 'react'
import { WBProvider } from '../../src/components/whiteboard/wbContext'
import PeerConnecion from '../../src/components/whiteboard/peerData';
import { Grid } from '@material-ui/core';
import WbCanvas from '../../src/components/whiteboard/wbCanvas';
import WbToolbar from '../../src/components/whiteboard/wbToolbar';

interface WorkspaceProps {

}

const Workspace: React.FC<WorkspaceProps> = () => {
    return (
        <PeerConnecion>
            <WBProvider>
                <Grid container justify='space-between'>
                    <Grid item xs={12}>
                        <WbToolbar />
                    </Grid>
                    <Grid item xs={12}>
                        <WbCanvas />
                    </Grid> 
                </Grid>
            </WBProvider>
        </PeerConnecion>
    );
}

export default Workspace;