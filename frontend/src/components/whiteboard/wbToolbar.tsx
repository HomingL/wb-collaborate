/* eslint-disable no-underscore-dangle */
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
import WBLogo from '../static_components/WBCollaborate';


const WbToolbar: React.FC = () => {
  const classes = useStyles();
  const { setPenState, canvas, setSelect, onCanvasChange } = useWBContext();

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
    saveCanvas();
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
    saveCanvas();
  };

  const createNewLine = (top: number, left: number) => {
    if (setPenState) setPenState(false);
    const line = new fabric.Line([top, left, top + 20, left + 20], {
      strokeWidth: 5,
      stroke: 'black' 
    });
    canvas?.add(line);
    saveCanvas();
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
    saveCanvas();
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
    saveCanvas();
  };

  function saveCanvas() {
    if (onCanvasChange) onCanvasChange(JSON.stringify(canvas?.toDatalessJSON()));
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          
          <WBLogo />
          
          <IconButton edge="start" className={classes.button} onClick={() => {
            canvas?.clear();
            saveCanvas();
          }}>
            <DeleteIcon />
          </IconButton>
          <IconButton edge="start" className={classes.button} onClick={()=> {
            canvas?._objects.pop();
            canvas?.renderAll();
            saveCanvas();
          }}>
            <RotateLeftIcon />
          </IconButton>
          <IconButton edge="start" className={classes.button} onClick={() => {
            if (setPenState) setPenState(true);
            if (setSelect) setSelect([]);
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