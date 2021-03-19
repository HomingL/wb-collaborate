import React, { useState } from 'react'
import { WBProvider } from '../../src/components/whiteboard/wbContext'
import PeerConnecion from '../../src/components/whiteboard/peerData';

interface WorkspaceProps {

}

const Workspace: React.FC<WorkspaceProps> = () => {
    const [paths, setPaths] = useState<any>([]);

    const pathHandler = (path: any) => {
        setPaths([...paths, path])
        console.log(path);
    }

    return (
        <PeerConnecion draw={pathHandler}>
            <WBProvider>
                {/* <Grid container justify='space-between'>
                    <Grid item>
                        <WbCanvas paths={paths} addPath={pathHandler}/>
                    </Grid>
                    <Grid item>
                        <WbCanvas paths={paths} addPath={pathHandler}/>
                    </Grid> 
                </Grid> */}
            </WBProvider>
        </PeerConnecion>
    );
}

export default Workspace;