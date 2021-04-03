import React, { useEffect, useState } from 'react'
import { Grid, Fab, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import WhiteboardCard from './WhiteboardCard';
import { useCreateWhiteboardMutation, useGetWhiteboardsLazyQuery } from '../../generated/apolloComponents';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// interface WorkspaceDashboardProps {
//   whiteboards: Whiteboard[]
// }

const WorkspaceDashboard: React.FC = () => {
    const classes = useStyles();
    const [wbName, setWbName] = useState<string>("");
    const [whiteboards, setWhiteboards] = useState<Whiteboard[]>([]);

    const [createWhiteboardMutation] = useCreateWhiteboardMutation({
      variables:{
        name: ''
      }
    });

    const [GetWhiteboardsQuery, {data, error}] = useGetWhiteboardsLazyQuery(
      {
        fetchPolicy: 'cache-and-network'
      }
    );

    const handleCreate = () =>{
      createWhiteboardMutation({
        variables: {name: wbName},
      }).then( (res) =>{
        console.log(res);
        GetWhiteboardsQuery();
        console.log("data", data);
      });

      setWbName("");
    }

    useEffect(() => {
      GetWhiteboardsQuery();
    }, []);

    useEffect(() =>{
      console.log(data, error);
      if (data)
        setWhiteboards(data?.GetWhiteboards);
    }, [data, error]);

    return (
      <Grid container spacing={3} justify='flex-start'>

        <Grid container className={classes.textArea} justify="center">
            <Grid item xs={6}>
                <TextField variant="outlined" label="Whiteboard Name" value={wbName} onChange={(e) => setWbName(e.target.value)} type="search" fullWidth/>
            </Grid>
            <Grid item xs={1} align="right">
              <Fab color="primary" aria-label="add" onClick={handleCreate}>
                  <AddIcon fontSize='large'/>
              </Fab>
            </Grid>
        </Grid>

        {whiteboards.map((whiteboard, index) => (
        <Grid item xs={6} sm={2} key={index}>
          <WhiteboardCard name={whiteboard.name} />
        </Grid>
        ))}

      </Grid>
    );
}

export interface Whiteboard{
  name: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    button: {
      marginRight: theme.spacing(1),
      color: "inherit",
    },
    title: {
      margin: theme.spacing(3),
    },
    textArea:{
        position: 'relative',
        padding: theme.spacing(2),
        margin: theme.spacing(1),
    }
  }));

export default WorkspaceDashboard