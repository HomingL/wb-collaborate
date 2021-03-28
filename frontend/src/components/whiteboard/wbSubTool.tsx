import React, { useEffect } from 'react'
import { useState} from 'react';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { IconButton } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Color, ColorPicker, ColorBox, createColor } from 'material-ui-color';
import { useWBContext } from './wbContext';

const WbSubTool: React.FC = () => {
    const classes = useStyles();
    const [value, setValue] = useState(5);
    const [color, setColor] = useState(createColor("black"));

    const [selectValue, setSelectValue] = useState(5);
    const [selectColor, setSelectColor] = useState(createColor("black"));
    const [selectBorderColor, setSelectBorderColor] = useState(createColor("black"));

    const { select, penState, canvas, setSelect } = useWBContext();

    useEffect(() =>{
        console.log("Selected", select);
        if (select && select.length === 1){
            const obj = select[0];
            let svalue = 0;
            let sColor = createColor("black");
            let sBorderColor = createColor("black");

            if (obj.type == "path")
                    sBorderColor = obj.stroke;
            else
                sColor = obj.fill;

        }
    }, [select]);

    const handleDelete = () =>{
        if (select && select.length > 0){
            select.forEach(obj => {
                canvas.remove(obj);
            });
            setSelect(null);
        }
        canvas.discardActiveObject().renderAll();
    }

    const handleCopyPaste = () => {
        if (select && select.length > 0){
            select.forEach(obj => {
                obj?.clone(clone => {
                    clone.set("left", clone.left + 10);
                    clone.set("top", clone.top + 10);
                    canvas.add(clone);
                });
            });
            canvas?.renderAll();
        }
    }

    const handleWidthChange = (event, newValue: number) => {
        if (select && select.length > 0){
            setSelectValue(newValue);
            select.forEach(obj => {
                
                obj.set("strokeWidth", newValue);
            });
            canvas?.renderAll();
            return
        }
        setValue(newValue);
        if (canvas){
            canvas.freeDrawingBrush.width = newValue;
        }
    };

    const handleColorChange = (newValue: Color, border: bool) => {
        if (select && select.length > 0){
            if (!border) setSelectColor(newValue);
            else setSelectBorderColor(newValue);
            select.forEach(obj => {
                if (obj.type == "path")
                    obj.set("stroke", "#" + newValue.hex);
                else
                    if (border) obj.set("stroke", "#" + newValue.hex);
                    else obj.set("fill", "#" + newValue.hex);

            });
            canvas?.renderAll();
            return
        }
        setColor(newValue);
        if (canvas){
            console.log("new_Color", newValue.hex);
            canvas.freeDrawingBrush.color = "#" + newValue.hex;
            console.log("brush", canvas.freeDrawingBrush.color)
        }
    };

    if (select && select.length > 0){
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
                            onChange={handleWidthChange}
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
                            onChange={(c: Color) => handleColorChange(c, false)} />
                  </Grid>
                  <Grid item>
                    #{color.hex}
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
                            onChange={(c: Color) => handleColorChange(c, true)} />
                  </Grid>
                  <Grid item>
                    #{color.hex}
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
                    onChange={handleWidthChange}
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
                    onChange={(c: Color) => handleColorChange(c, false)} />
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
  }));

export default WbSubTool;