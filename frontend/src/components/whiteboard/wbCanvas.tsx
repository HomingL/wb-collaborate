import React, { useRef, useEffect, useState } from 'react'
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fabric } from "fabric";
// import { theme } from '../../theme';
import { useWBContext } from '../whiteboard/wbContext'
import { usePBContext } from './peerData';

interface WhiteboardProps {
  paths: any[],
  addPath: (path: any) => void
}

const WbCanvas: React.FC<WhiteboardProps> = ({ addPath, paths }) => {
  
  const { penState, setPenState, canvas, setCanvas } = useWBContext();
  const { peerBroadcast } = usePBContext();

  const classes = useStyles();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canv = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true
    });

    console.log(setPenState);
    console.log(canvas);
    console.log(penState);
    setCanvas(canv);
    setPenState("down");
    console.log(canvas);
    console.log(penState);

    // canvas.on('path:created', function(e:any){
    //   const your_path = e.path;
    //   console.log(your_path);
    //   addPath(your_path);  
    //   peerBroadcast(your_path);
    // });
    
    // canvas.on('mouse:move', function(e){
    //   if (e.isClick)
    //     console.log(e);      
    // });
    // console.log('canvas: ', canvas.freeDrawingBrush);

    // var brush = new fabric.PencilBrush();
    // brush.color = 'red';
    // brush.width = 4;
    // canvas.freeDrawingBrush = brush;

    // if (canvas.freeDrawingBrush) {
    //   const brush: fabric.FreeDrawingBrush = canvas.freeDrawingBrush;
    //   // var brush = new fabric.CircleBrush();
    //   // // brush = brush_circle;
    //   // brush.color = 'red';
    //   // brush.width = 32;
    // //   canvas.freeDrawingBrush = brush;
    //   // if (brush.getPatternSrc) {
    //   //   brush.source = brush.getPatternSrc.call(brush);
    //   // }
    //   brush.width = parseInt(13, 10) || 1;
    //   brush.shadow = new fabric.Shadow({
    //     blur: parseInt(13, 10) || 0,
    //     offsetX: 0,
    //     offsetY: 0,
    //     affectStroke: true,
    //     color: 'red',
    //   });
    // }
  },[]);

  useEffect(()=> {
    paths.forEach((path) => canv?.add(path));
  }, [paths]);
  
  return (
    <div className={classes.root}>
      <canvas ref={canvasRef} id="canvas" width="400" height="750"></canvas>
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