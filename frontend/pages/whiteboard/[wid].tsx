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
    const [whiteboardId, setWhiteboardId] = useState<string>('');

    useEffect(() => {
        const { wid } = router.query;
        
        setWhiteboardId(wid as string);

        console.log('whiteboardId:', router.query);
    }, [router.query.wid])

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