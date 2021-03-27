import React from 'react'
import { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Color, ColorPicker, createColor } from 'material-ui-color';
import { useWBContext } from './wbContext';

const WbSubTool: React.FC = () => {
    const classes = useStyles();
    const [value, setValue] = useState(5);
    const [color, setColor] = useState(createColor("black"));
    const { setPenState, canvas } = useWBContext();

    const handleWidthChange = (event, newValue: number) => {
        setValue(newValue);
        if (canvas){
            canvas.freeDrawingBrush.width = newValue;
        }
    };

    const handleColorChange = (newValue: Color) => {
        setColor(newValue);
        if (canvas){
            console.log("new_Color", newValue.hex);
            canvas.freeDrawingBrush.color = "#" + newValue.hex;
            console.log("brush", canvas.freeDrawingBrush.color)
        }
      };

    return(
    <div className={classes.root}>
        <Typography gutterBottom>
          Pen width
        </Typography>
        <Grid container spacing={2}>
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
          
          <Typography gutterBottom>
            Pen Color
          </Typography>
          <ColorPicker  value={color} 
                        onChange={handleColorChange} />
        </Grid>


    </div>
    )
}

const useStyles = makeStyles({
    root: {
      width: '100%',
      justifyItems: 'center',
      padding: '5%'
    },
  });

export default WbSubTool;