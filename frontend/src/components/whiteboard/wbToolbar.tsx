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
import FormatShapesIcon from '@material-ui/icons/FormatShapes';
import CropDinSharpIcon from '@material-ui/icons/CropDinSharp';
import TextFieldsIcon from '@material-ui/icons/TextFields';
// import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
// import InsertPhotoSharpIcon from '@material-ui/icons/InsertPhotoSharp';
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
      top: top, left: left, width: 50, height: 50, fill: 'grey', borderColor:'red' });
    canvas?.add(rect);
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
          <IconButton edge="start" className={classes.button} onClick={() => createNewRect(100, 100)}>
            <FormatShapesIcon />
          </IconButton>
          <IconButton edge="start" className={classes.button} onClick={() => createNewTextBox()}>
            <TextFieldsIcon />
          </IconButton>
          <IconButton edge="start" className={classes.button}>
            <CropDinSharpIcon />
          </IconButton>
          {/* <IconButton edge="start" className={classes.button}>
            <RadioButtonUncheckedIcon />
          </IconButton> */}
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