import React from 'react'
import { Card, makeStyles, Typography, CardContent, Button, CardActions } from '@material-ui/core';
import { Whiteboard } from './WorkspaceDashboard';
import { useRouter } from 'next/router';

const WhiteboardCard: React.FC<Whiteboard> = ({user, name, id, data}) => {

  const router = useRouter();
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          { name }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => router.push("/whiteboard/" + id)}>Open Board</Button>
      </CardActions>
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