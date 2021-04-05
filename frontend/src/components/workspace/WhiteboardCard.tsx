import React from 'react'
import { Card, makeStyles, Typography, CardContent, Button, CardActions, CardMedia, IconButton} from '@material-ui/core';
import { useRouter } from 'next/router';
import { fabric } from "fabric";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { useDeleteWhiteboardMutation, User } from '../../generated/apolloComponents';

interface WhiteboardCardProp{
  setRefresh: (state : boolean) => void;
  size: number,
  page: number,
  name: string,
  id: string,
  user: User,
  refresh: boolean
}

const WhiteboardCard: React.FC<WhiteboardCardProp> = ({setRefresh, refresh, user, name, id}) => {

  const router = useRouter();
  const classes = useStyles();

  const [deleteWhiteboardMutation] = useDeleteWhiteboardMutation({
    variables:{
      id: ''
    }
  });

  const canvas = new fabric.Canvas('canvas');

  const url = canvas.toDataURL(user + "/" + id);
  
  fabric.Image.fromURL(url, function(img) {
    canvas.add(img);
    // call toDataURL after image gets loaded
    console.log(canvas.toDataURL());
  });

  

  // console.log(url);

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
      <CardMedia
        image={url}
        title="Name"
      />
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