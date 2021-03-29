import React, { useRef, useEffect } from 'react'
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fabric } from "fabric";
import { useWBContext } from '../whiteboard/wbContext';
import { usePBContext } from './peerData';
import { useGetWhiteboardLazyQuery } from '../../generated/apolloComponents';
// import { Root, Type, Field } from 'protobufjs';

interface WbCanvasProp {
  wid: string,
}

const WbCanvas: React.FC<WbCanvasProp> = ({ wid }) => {
  const { penState, setCanvas, onCanvasChange } = useWBContext();
  const { peerBroadcast, peerData } = usePBContext();
  const [GetWhiteboardQuery, { data, error }] = useGetWhiteboardLazyQuery({
    variables: {
       id: wid
    },
  });

  const classes = useStyles();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canv = useRef<fabric.Canvas>();
  const pState = useRef<boolean | undefined>(penState);
  const isDrawing = useRef<boolean>(false);
  const brushStart = useRef<{x: number, y: number}>();
  const brushEnd = useRef<{x: number, y: number}>();

  function broadcastData(data:any) {
    try {
      data = JSON.stringify(data);
      if (peerBroadcast) peerBroadcast(data);
    } catch (err) {
      if (err instanceof TypeError) console.error('Stringify Error', err);
      else console.error(err);
    }
  }

  function onMouseDown(e:Event) {
    if (pState.current) {   /** make sure it's in penState */
      isDrawing.current = true;
      /** set the starting point of the brush and clear the previous endpoint */
      brushStart.current = canv.current?.getPointer(e);
      brushEnd.current = undefined;
    }
  }

  function onMouseUp(e:Event) {
    isDrawing.current = false;
    const stringifiedCanv = JSON.stringify(canv.current?.toDatalessJSON());
    if (pState.current) {
      brushEnd.current = canv.current?.getPointer(e);
      // broadcastData({ start: brushStart.current, end: brushEnd.current, /*canvas: stringifiedCanv*/ });
    }
    if (onCanvasChange) onCanvasChange(stringifiedCanv);
  }

  function onMouseMove(e:Event) {
    if (isDrawing.current) {
      if (brushEnd.current) brushStart.current = brushEnd.current;
      brushEnd.current = canv.current?.getPointer(e);
      broadcastData({ start: brushStart.current, end: brushEnd.current });
    }
  }

  function onObjectModified() {
    const stringifiedCanv = JSON.stringify(canv.current?.toDatalessJSON());
    if (onCanvasChange) onCanvasChange(stringifiedCanv);
  }

  useEffect(() => {
    canv.current = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true
    });
    canv.current.freeDrawingBrush.color = '#00aeff';
    canv.current.freeDrawingBrush.width = 5;
    if(setCanvas) setCanvas(canv.current);
  }, []);

  useEffect(() => {

    if (canv.current && wid) {
      canv.current.on('mouse:down', function({e}) {
        onMouseDown(e);
      }).on('mouse:up', function({e}) {
        onMouseUp(e);
      }).on('mouse:move', function({e}) {
        onMouseMove(e);
      }).on('object:modified', function() {
        onObjectModified();
      });

      GetWhiteboardQuery({
        variables: {
          id: wid
       },
      });
    }

  },[peerBroadcast, canv, wid]);

  useEffect(() => {
    if (error) return console.error(error);
    canv.current?.loadFromJSON(data?.GetWhiteboard?.data, canv.current.renderAll.bind(canv.current));
  }, [data, error]);

  /** penState won't get update in listeners under useEffect unless updating it using reference */
  useEffect(() => {
    // console.log("penState:", penState);
    pState.current = penState;
  }, [penState]);

  useEffect(() => {
    if (peerData) {
      try {
        const pData = JSON.parse(peerData);
        // console.log("pData", pData);
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
        } else console.error(err);
      }
    }

  }, [peerData]);

  // useEffect(() => {
  //   console.log("objs", objects.current);
  //   if (canv.current) canv.current._objects = objects.current;
  //   canv.current?.renderAll();
  // }, [objects.current]);

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