/* eslint-disable no-underscore-dangle */
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import PanToolIcon from '@material-ui/icons/PanTool';
import DeleteIcon from '@material-ui/icons/Delete';
import CropDinSharpIcon from '@material-ui/icons/CropDinSharp';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import { useWBContext } from './wbContext';
import { fabric } from "fabric";
import { usePBContext } from './peerData';


const WbToolbar: React.FC = () => {
  const classes = useStyles();
  const { setPenState, canvas, setSelect } = useWBContext();
  const { peerBroadcast } = usePBContext();

  const createNewRect = (top: number, left: number) => {
    if (setPenState) setPenState(false);
    const rect = new fabric.Rect({
      top: top, 
      left: left, 
      width: 50, 
      height: 50, 
      fill: 'black', 
      borderColor:'black' 
    });
    canvas?.add(rect);
    if (peerBroadcast) peerBroadcast(JSON.stringify({ canvas: canvas?.toDatalessJSON() }));
  };

  const createNewCirc = (top: number, left: number) => {
    if (setPenState) setPenState(false);
    const circ = new fabric.Circle({
      top: top, 
      left: left,
      radius: 30,
      fill: 'black', 
      borderColor:'black' 
    });
    canvas?.add(circ);
    if (peerBroadcast) peerBroadcast(JSON.stringify({ canvas: canvas?.toDatalessJSON() }));
  };

  const createNewLine = (top: number, left: number) => {
    if (setPenState) setPenState(false);
    const line = new fabric.Line([top, left, top + 20, left + 20], {
      strokeWidth: 5,
      stroke: 'black' 
    });
    canvas?.add(line);
    if (peerBroadcast) peerBroadcast(JSON.stringify({ canvas: canvas?.toDatalessJSON() }));
  };

  const createNewTri = (top: number, left: number) => {
    if (setPenState) setPenState(false);
    const tri = new fabric.Triangle({
      top: top, 
      left: left, 
      width: 50, 
      height: 50, 
      fill: 'black', 
      borderColor:'black' 
    });
    canvas?.add(tri);
    if (peerBroadcast) peerBroadcast(JSON.stringify({ canvas: canvas?.toDatalessJSON() }));
  };

  const createNewTextBox = () => {
    if (setPenState) setPenState(false);
    const textBox = new fabric.Textbox('text box',{
      width: 200,
      height: 200,
      top: 250,
      left: 5,
      fontSize: 14,
      textAlign: 'center'
    });
    canvas?.add(textBox);
    if (peerBroadcast) peerBroadcast(JSON.stringify({ canvas: canvas?.toDatalessJSON() }));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" className={classes.title}>
            Wb Collaborate
          </Typography>
          <IconButton edge="start" className={classes.button} onClick={() => {
            canvas?.clear();
            if (peerBroadcast) peerBroadcast(JSON.stringify({ canvas: canvas?.toDatalessJSON() }));
          }}>
            <DeleteIcon />
          </IconButton>
          <IconButton edge="start" className={classes.button} onClick={()=> {
            canvas?._objects.pop();
            canvas?.renderAll();
            if (peerBroadcast) peerBroadcast(JSON.stringify({ canvas: canvas?.toDatalessJSON() }));
          }}>
            <RotateLeftIcon />
          </IconButton>
          <IconButton edge="start" className={classes.button} onClick={() => {
            if (setPenState) setPenState(true);
            if (setSelect) setSelect(null);
          }}>
            <CreateIcon />
          </IconButton>
          <IconButton edge="start" className={classes.button} onClick={() => {
            if (setPenState) setPenState(false);
            }}>
            <PanToolIcon />
          </IconButton>
          <IconButton edge="start" className={classes.button} onClick={() => createNewLine(100, 100)}>
            <ShowChartIcon />
          </IconButton>
          <IconButton edge="start" className={classes.button} onClick={() => createNewRect(100, 100)}>
            <CropDinSharpIcon />
          </IconButton>
          <IconButton edge="start" className={classes.button} onClick={() => createNewTri(100, 100)}>
            <ChangeHistoryIcon />
          </IconButton>
          <IconButton edge="start" className={classes.button} onClick={() => createNewCirc(100, 100)}>
            <RadioButtonUncheckedIcon />
          </IconButton>
          <IconButton edge="start" className={classes.button} onClick={() => createNewTextBox()}>
            <TextFieldsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    button: {
      marginRight: theme.spacing(2),
      color: "inherit",
    },
    title: {
      margin: theme.spacing(3),
    },
  }),
);

export default WbToolbar;