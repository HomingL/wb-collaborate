import React, { useRef, useEffect } from 'react'
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fabric } from "fabric";
import { useWBContext } from '../whiteboard/wbContext';
import { usePBContext } from './peerData';
import { useGetWhiteboardLazyQuery } from '../../generated/apolloComponents';

interface WbCanvasProp {
  wid: string,
}

const WbCanvas: React.FC<WbCanvasProp> = ({ wid }) => {
  const { penState, setCanvas, setSelect, onCanvasChange } = useWBContext();
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
    }
    if (onCanvasChange) onCanvasChange(stringifiedCanv);
  }

  function onMouseMove(e:Event) {
    if (isDrawing.current) {
      if (brushEnd.current) brushStart.current = brushEnd.current;
      brushEnd.current = canv.current?.getPointer(e);
      const brush = { width: canv.current?.freeDrawingBrush.width, color: canv.current?.freeDrawingBrush.color};
      broadcastData({ start: brushStart.current, end: brushEnd.current, brush:brush });
    }
  }

  function onObjectModified() {
    const stringifiedCanv = JSON.stringify(canv.current?.toDatalessJSON());
    if (onCanvasChange) onCanvasChange(stringifiedCanv);
  }

  function onSelected(lst: fabric.Object[]) {
    if (setSelect) setSelect(lst);
  }

  useEffect(() => {
    canv.current = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true
    });

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
      }).on('selection:created', function() {
        onSelected(canv.current?.getActiveObjects() ? canv.current?.getActiveObjects() : []);
      }).on('selection:cleared', function() {
        onSelected([]);
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
    pState.current = penState;
  }, [penState]);

  useEffect(() => {
    if (peerData) {
      try {
        const pData = JSON.parse(peerData);
        if (pData.canvas) {
          canv.current?.loadFromJSON(pData.canvas, canv.current.renderAll.bind(canv.current));
        }
        if (pData.start && pData.end) {
          const brush = new fabric.PencilBrush();
          brush.color = pData.brush.color;
          brush.width = pData.brush.width;
          canv.current?.add(brush.createPath(brush.convertPointsToSVGPath([pData.start,pData.end]).toString()));
        }
      } catch (err) {
        if (err instanceof SyntaxError) {
          console.log("peerData is not in JSON type", peerData);
        } else console.error(err);
      }
    }

  }, [peerData]);

  return (
    <div className={classes.root}>
      <canvas className={classes.canv} ref={canvasRef} id="canvas" width={1650} height={750}></canvas>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root:{
    margin: theme.spacing(3),
  },
  canv:{
    border: '5px solid black',
  }
}));

export default WbCanvas