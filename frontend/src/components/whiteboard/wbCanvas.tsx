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
  const { peerBroadcast, peerData } = usePBContext();

  const classes = useStyles();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canv = useRef<fabric.Canvas>();
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
      isDrawing.current = true;
      brushStart.current = canv.current?.getPointer(e);
      brushEnd.current = undefined;
      // if (peerBroadcast) peerBroadcast(JSON.stringify({ mouseDownEvent: e }));
    }).on('mouse:up', function({e}) {
      isDrawing.current = false;
      brushEnd.current = canv.current?.getPointer(e);
      if (peerBroadcast) peerBroadcast(JSON.stringify({ start: brushStart.current, end: brushEnd.current, canvas: canv.current }));
      // if (peerBroadcast) peerBroadcast(JSON.stringify({ mouseUpEvent: e }));
    }).on('mouse:move', function({e}) {
      if (isDrawing.current) {
        if (brushEnd.current) brushStart.current = brushEnd.current;
        brushEnd.current = canv.current?.getPointer(e);
        if (peerBroadcast) peerBroadcast(JSON.stringify({ start: brushStart.current, end: brushEnd.current }));
        // const pointer = canv.current?.getPointer(e);
        // if (peerBroadcast) peerBroadcast(JSON.stringify({ realTimePointer: pointer, mouseMoveEvent: e }));
      }
    });

    // canv.current.on('path:created', function(e:any){
    //   const your_path = e.path;
    //   console.log(your_path);
    //   // addPath(your_path);
    //   if (peerBroadcast) peerBroadcast(JSON.stringify(your_path));
    // });
  },[peerBroadcast]);

  useEffect(() => {
    // const path = new fabric.Path(peerData);
    // console.log("newPath", path);
    // canv.current?.add(path);
    
    console.log("peerData", peerData);
    if (peerData) {
      const pData = JSON.parse(peerData);
      // if (pData.onMouseDown) {
      //   const pointer = canv.current?.getPointer(pData.mouseDownEvent);
      //   canv.current?.freeDrawingBrush.onMouseDown(pointer, {e: pData.mouseDownEvent});
      // }
      // if (pData.onMouseUp) {
      //   const pointer = canv.current?.getPointer(pData.mouseUpEvent);
      //   canv.current?.freeDrawingBrush.onMouseUp(pointer);
      // }
      // if (pData.mouseMoveEvent) {
      //   canv.current?.freeDrawingBrush.onMouseMove(pData.realTimePointer, {e: pData.mouseMoveEvent});
      // }
      if (pData.canvas) {
        canv.current?.loadFromJSON(pData.canvas, canv.current.renderAll.bind(canv.current));
      }
      if (pData.start && pData.end) {
        const brush = new fabric.PencilBrush();
        brush.color = '#00aeff';
        brush.width = 5;
        canv.current?.add(brush.createPath(brush.convertPointsToSVGPath([pData.start,pData.end]).toString()));
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