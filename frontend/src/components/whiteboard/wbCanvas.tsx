import React, { useRef, useEffect } from 'react'
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fabric } from "fabric";
// import { theme } from '../../theme';
import { useWBContext } from '../whiteboard/wbContext'
import { usePBContext } from './peerData';

const WbCanvas: React.FC = () => {
  
  const { penState, setCanvas } = useWBContext();
  const { peerBroadcast, peerData } = usePBContext();

  const classes = useStyles();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canv = useRef<fabric.Canvas>();
  const pState = useRef<boolean | undefined>(penState);
  const isDrawing = useRef<boolean>(false);
  const brushStart = useRef<{x: number, y: number}>();
  const brushEnd = useRef<{x: number, y: number}>();

  useEffect(() => {
    canv.current = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true
    });
    if(setCanvas) setCanvas(canv.current);
    canv.current.freeDrawingBrush.color = '#00aeff';
    canv.current.freeDrawingBrush.width = 5;

    canv.current.on('mouse:down', function({e}) {
      if (pState.current) {
        isDrawing.current = true;
        brushStart.current = canv.current?.getPointer(e);
        brushEnd.current = undefined;
      }
    }).on('mouse:up', function({e}) {
      isDrawing.current = false;
      if (pState.current) {
        brushEnd.current = canv.current?.getPointer(e);
        if (peerBroadcast) peerBroadcast(JSON.stringify({ start: brushStart.current, end: brushEnd.current, canvas: canv.current }));
      }
    }).on('mouse:move', function({e}) {
      if (isDrawing.current) {
        if (brushEnd.current) brushStart.current = brushEnd.current;
        brushEnd.current = canv.current?.getPointer(e);
        if (peerBroadcast) peerBroadcast(JSON.stringify({ start: brushStart.current, end: brushEnd.current }));
      }
    }).on('object:modified', function() {
      if (peerBroadcast) peerBroadcast(JSON.stringify({ canvas: canv.current }));
    });

    // canv.current.on('path:created', function(e:any){
    //   const your_path = e.path;
    //   console.log(your_path);
    //   // addPath(your_path);
    //   if (peerBroadcast) peerBroadcast(JSON.stringify(your_path));
    // });
  },[peerBroadcast]);

  useEffect(() => {
    console.log("penState:", penState);
    pState.current = penState;
  }, [penState]);

  useEffect(() => {
    console.log("peerData", peerData);
    if (peerData) {
      try {
        const pData = JSON.parse(peerData);
        if (pData.canvas) {
          canv.current?.loadFromJSON(pData.canvas, canv.current.renderAll.bind(canv.current));
        }
        if (pData.start && pData.end) {
          const brush = new fabric.PencilBrush();
          brush.color = '#00aeff';
          brush.width = 5;
          canv.current?.add(brush.createPath(brush.convertPointsToSVGPath([pData.start,pData.end]).toString()));
        }
      } catch (err) {
        if (err instanceof SyntaxError) {
          console.log("peerData is not in JSON type", peerData);
        }
      }
    }

  }, [peerData]);

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