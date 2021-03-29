import React, { useEffect } from 'react'
import { useState} from 'react';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fabric } from "fabric";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { IconButton } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Color, ColorPicker, createColor } from 'material-ui-color';
import { usePBContext } from './peerData';
import { useWBContext } from './wbContext';

const WbSubTool: React.FC = () => {
    const classes = useStyles();
    const [value, setValue] = useState(5);
    const [color, setColor] = useState(createColor("black"));

    const [selectValue, setSelectValue] = useState(0);
    const [selectColor, setSelectColor] = useState(createColor("black"));
    const [selectBorderColor, setSelectBorderColor] = useState(createColor("black"));
    const [selectBackgroundColor, setSelectBackgroundColor] = useState(createColor("white"));


    const { peerBroadcast } = usePBContext();

    const { select, canvas, setSelect } = useWBContext();

    useEffect(() =>{
        if (select && select.length === 1){
            const obj: fabric.Object = select[0];
            let sColor: Color = createColor("black");

            if (obj?.type == "path")
                sColor = createColor(obj?.stroke ? obj?.stroke : "black");
            else
                sColor = createColor(obj?.fill  ? obj?.fill : "black");
            
            setSelectValue(obj?.strokeWidth ? obj?.strokeWidth :0);
            setSelectColor(sColor);
            setSelectBorderColor(createColor(obj?.stroke ? obj?.stroke : "black"));
            setSelectBackgroundColor(createColor(obj?.backgroundColor ? obj?.backgroundColor : "white"));
        }
        else{
            setSelectValue(0);
            setSelectColor(createColor("black"));
            setSelectBorderColor(createColor("black"));
        }
    }, [select]);

    const handleDelete = () =>{
        if (select && select.length > 0){
            select.forEach(obj => {
                canvas?.remove(obj);
            });
            if (setSelect) setSelect([]);
            if (peerBroadcast) peerBroadcast(JSON.stringify({ canvas: canvas?.toDatalessJSON() }));
        }
        canvas?.discardActiveObject().renderAll();
    }

    const handleCopyPaste = () => {
        if (select && select.length > 0){
            canvas?.discardActiveObject();
            select.forEach(obj => {
                obj?.clone((clone: fabric.Object) => {
                  clone.set("left", obj?.left?? + 15);
                  clone.set("top", obj?.top?? + 15);
                  canvas?.add(clone);
                  canvas?.setActiveObject(clone);
                });
            });
            canvas?.renderAll();
            if (peerBroadcast) peerBroadcast(JSON.stringify({ canvas: canvas?.toDatalessJSON() }));
        }
    }

    const handleWidthChange = (newValue: number|number[]) => {
        if (Array.isArray(newValue)) return;

        if (select && select.length > 0){
            setSelectValue(newValue);
            select.forEach(obj => {
                
                obj.set("strokeWidth", newValue);
            });
            canvas?.renderAll();
            if (peerBroadcast) peerBroadcast(JSON.stringify({ canvas: canvas?.toDatalessJSON() }));
            return
        }
        setValue(newValue);
        if (canvas){
            canvas.freeDrawingBrush.width = newValue;
        }
    };

    const handleColorChange = (newValue: Color, type: number) => {
        if (select && select.length > 0){
            if (type == 0) setSelectColor(newValue);
            else if (type == 1) setSelectBorderColor(newValue);
            else setSelectBackgroundColor(newValue);
            select.forEach(obj => {
                if (type == 2)
                  obj.set("backgroundColor", "#" + newValue.hex);
                
                else{
                  if (obj.type == "path" || obj.type == "line")
                    obj.set("stroke", "#" + newValue.hex);
                  else{
                    if (type == 0) obj.set("fill", "#" + newValue.hex);
                    else if (type == 1) obj.set("stroke", "#" + newValue.hex);
                  }
                }
            });
            canvas?.renderAll();
            if (peerBroadcast) peerBroadcast(JSON.stringify({ canvas: canvas?.toDatalessJSON() }));
            return
        }
        setColor(newValue);
        if (canvas){
            canvas.freeDrawingBrush.color = "#" + newValue.hex;        }
    };

    if (select && select.length > 0){
        return(
            <div className={classes.root}>
        
                <Typography gutterBottom>
                  Width
                </Typography>
                <Grid container alignItems='center' justify='space-between'>
                  <Grid item xs>
                    <Slider defaultValue= {0} 
                            step={1} 
                            min={0} 
                            max={50} 
                            value={selectValue} 
                            valueLabelDisplay="auto"
                            onChange={(_e, w:number|number[]) => handleWidthChange(w)}
                            aria-labelledby="continuous-slider" />
                  </Grid>
                  <Grid item>
                    {selectValue}
                  </Grid>
                </Grid>
                
                <Typography gutterBottom>
                    Object Color
                </Typography>
                <Grid container alignItems='center' justify='space-between'>
                  <Grid item xs>
                  <ColorPicker defaultValue= '#000'
                            hideTextfield 
                            value={selectColor} 
                            onChange={(c: Color) => handleColorChange(c, 0)} />
                  </Grid>
                  <Grid item>
                    #{selectColor.hex}
                  </Grid>
                </Grid>

                <Typography gutterBottom>
                    Border Color
                </Typography>
                <Grid container alignItems='center' justify='space-between'>
                  <Grid item xs>
                  <ColorPicker defaultValue= '#000'
                            hideTextfield 
                            value={selectBorderColor} 
                            onChange={(c: Color) => handleColorChange(c, 1)} />
                  </Grid>
                  <Grid item>
                    #{selectBorderColor.hex}
                  </Grid>
                </Grid>

                <Typography gutterBottom>
                    Border Color
                </Typography>
                <Grid container alignItems='center' justify='space-between'>
                  <Grid item xs>
                  <ColorPicker defaultValue= '#000'
                            hideTextfield 
                            value={selectBackgroundColor} 
                            onChange={(c: Color) => handleColorChange(c, 2)} />
                  </Grid>
                  <Grid item>
                    #{selectBackgroundColor.hex}
                  </Grid>
                </Grid>

                <IconButton edge="start" className={classes.button} onClick={handleDelete}>
                    <HighlightOffIcon />
                </IconButton>

                <IconButton edge="start" className={classes.button} onClick={handleCopyPaste}>
                    <FileCopyIcon />
                </IconButton>
            </div>
            )
    }

    return(
    <div className={classes.root}>

        <Typography gutterBottom>
          Pen width
        </Typography>
        <Grid container alignItems='center' justify='space-between'>
          <Grid item xs>
            <Slider defaultValue= {5} 
                    step={5} 
                    min={5} 
                    max={50} 
                    value={value} 
                    valueLabelDisplay="auto"
                    onChange={(_e, w:number|number[]) => handleWidthChange(w)}
                    aria-labelledby="continuous-slider" />
          </Grid>
          <Grid item>
            {value}
          </Grid>
        </Grid>
        
        <Typography gutterBottom>
            Pen Color
        </Typography>
        <Grid container alignItems='center' justify='space-between'>
          <Grid item xs>
          <ColorPicker defaultValue= '#000'
                    hideTextfield 
                    value={color} 
                    onChange={(c: Color) => handleColorChange(c, 0)} />
          </Grid>
          <Grid item>
            #{color.hex}
          </Grid>
        </Grid>
        


    </div>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      width: '100%',
      justifyItems: 'center',
      padding: theme.spacing(3),
    },
    button: {
      marginRight: theme.spacing(2),
      color: "inherit",
    },
  }));

export default WbSubTool;