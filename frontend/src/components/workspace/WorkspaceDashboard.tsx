import React, { useEffect, useState } from 'react'
import { Grid, Fab, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import WhiteboardCard from './WhiteboardCard';
import { useCreateWhiteboardMutation, useGetWhiteboardsLazyQuery, User } from '../../generated/apolloComponents';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Whiteboard from '../../../pages/whiteboard/[wid]';
import Pagination from '@material-ui/lab/Pagination';


// interface WorkspaceDashboardProps {
//   whiteboards: Whiteboard[]
// }

const WorkspaceDashboard: React.FC = () => {
    const pageLimit = 12;
    const classes = useStyles();
    const [wbName, setWbName] = useState<string>("");
    const [whiteboards, setWhiteboards] = useState<Whiteboard[]>([]);
    const [allWhiteboards, setAllWhiteboards] = useState<Whiteboard[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPage, settotalPage] = useState<number>(1);

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
        GetWhiteboardsQuery();
      });

      setWbName("");
    }

    useEffect(() => {
      GetWhiteboardsQuery();
    }, []);

    useEffect(() =>{
      if (data){
        const pg = Math.ceil(data?.GetWhiteboards.length/pageLimit);
        setAllWhiteboards(data?.GetWhiteboards);
        settotalPage(pg ? pg : 1);
      }
    }, [data, error]);

    useEffect( () =>{
      console.log("Page", page);
      setWhiteboards(allWhiteboards.slice((page - 1)*pageLimit, (page)*pageLimit));
    }, [allWhiteboards, page]);

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
          <Grid item xs={3} key={index}>
            <WhiteboardCard {...whiteboard} />
          </Grid>
        ))}

        <Grid className={classes.paging} container justify="center">        
            <Pagination count={totalPage} color="primary" onChange={(_, pg) => setPage(pg)}/>
        </Grid>
      </Grid>
    );
}

export interface Whiteboard{
  name: string,
  data: string,
  id: string,
  user: User
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
    },
    paging:{
      margin: theme.spacing(10),
    }
  }));

export default WorkspaceDashboard