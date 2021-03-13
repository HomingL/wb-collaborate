import React, { useState } from 'react'
import { Grid } from '@material-ui/core';
import Whiteboard from '../../src/components/whiteboard/whiteboard'

interface WorkspaceProps {

}

const Workspace: React.FC<WorkspaceProps> = () => {
    const [paths, setPaths] = useState<any>([]);

    const pathHandler = (path: any) => {
        setPaths([...paths, path])
    }

    return (
        <Grid container justify='space-between'>
            <Grid item>
                <Whiteboard paths={paths} addPath={pathHandler}/>
            </Grid>
            <Grid item>
                <Whiteboard paths={paths} addPath={pathHandler}/>
            </Grid> 
        </Grid>
    );
}

export default Workspace;