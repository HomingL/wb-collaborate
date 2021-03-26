import React from 'react'
import { Card, makeStyles, Typography, CardContent } from '@material-ui/core';

interface WhiteboardCardProps {
  name: string
}

const WhiteboardCard: React.FC<WhiteboardCardProps> = ({ name }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          { name }
        </Typography>
      </CardContent>
    </Card>
  );  
}

const useStyles = makeStyles({
  root: {
    minWidth: 100,
  },
  title: {
    fontSize: 14,
  },
});



export default WhiteboardCard