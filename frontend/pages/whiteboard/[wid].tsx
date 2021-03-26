import React, { useEffect, useState } from 'react'
import { WBProvider } from '../../src/components/whiteboard/wbContext'
import PeerConnecion from '../../src/components/whiteboard/peerData';
import { Grid } from '@material-ui/core';
import WbCanvas from '../../src/components/whiteboard/wbCanvas';
import WbToolbar from '../../src/components/whiteboard/wbToolbar';
import { useRouter } from 'next/router';

interface WhiteboardProps {

}

const Whiteboard: React.FC<WhiteboardProps> = () => {
    const router = useRouter()
    console.log("router query wid:", router.query.wid);
    const [whiteboardId, setWhiteboardId] = useState<string>('');

    useEffect(() => {
    const wid: string= router.query.wid;
    
    setWhiteboardId(wid);

        console.log('whiteboardId:', whiteboardId);
    }, [])

    return (
      <PeerConnecion wid={whiteboardId}>
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

export default Whiteboard;