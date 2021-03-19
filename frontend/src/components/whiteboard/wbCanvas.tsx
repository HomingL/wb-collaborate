import React, { useRef, useEffect } from 'react'
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fabric } from "fabric";
// import { theme } from '../../theme';
import { useWBContext } from '../whiteboard/wbContext'
import { usePBContext } from './peerData';

interface WhiteboardProps {
  // paths: any[],
  // addPath: (path: any) => void
}

const WbCanvas: React.FC<WhiteboardProps> = () => {
  
  const { setCanvas } = useWBContext();
  const { peerBroadcast } = usePBContext();

  const classes = useStyles();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canv = useRef<fabric.Canvas>();

  useEffect(()=>{
    canv.current = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true
    });

    if(setCanvas) setCanvas(canv.current);
    canv.current.on('path:created', function(e:any){
      const your_path = e.path;
      console.log(your_path);
      // addPath(your_path);
      if (peerBroadcast) peerBroadcast({path: your_path});
    });
  },[peerBroadcast]);

  return (
    <div className={classes.root}>
      <canvas ref={canvasRef} id="canvas" width="1500" height="750"></canvas>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root:{
    border: '5px solid black',
    margin: theme.spacing(3),
  },
}));

export default WbCanvas