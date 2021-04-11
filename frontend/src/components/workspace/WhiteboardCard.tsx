import React from 'react'
import { Card, makeStyles, Typography, CardContent, Button, CardActions, IconButton} from '@material-ui/core';
import { useRouter } from 'next/router';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { useDeleteWhiteboardMutation, Whiteboard } from '../../generated/apolloComponents';

interface WhiteboardCardProp{
  setRefresh: (state : boolean) => void;
  refresh: boolean;
  whiteboard: Whiteboard;
}

const WhiteboardCard: React.FC<WhiteboardCardProp> = ({setRefresh, refresh, whiteboard: {id, name}}) => {

  const router = useRouter();
  const classes = useStyles();

  const [deleteWhiteboardMutation] = useDeleteWhiteboardMutation({
    variables:{
      id: ''
    }
  });

  const handleDelete = () => {
    deleteWhiteboardMutation({
      variables:{
      id: id
    }});

    setRefresh(!refresh);
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          { name }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => router.push("/whiteboard/" + id)}>Open Board</Button>
        <IconButton onClick={handleDelete} aria-label="add to favorites">
          <DeleteSweepIcon />
        </IconButton>
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