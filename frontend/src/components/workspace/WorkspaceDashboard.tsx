import React, { useEffect, useState } from 'react'
import { Grid, Fab, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import WhiteboardCard from './WhiteboardCard';
import { useCreateWhiteboardMutation, useGetWhiteboardsLazyQuery, Whiteboard } from '../../generated/apolloComponents';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const WorkspaceDashboard: React.FC = () => {
    const pageLimit = 12;
    const classes = useStyles();
    const [wbName, setWbName] = useState<string>("");
    const [whiteboards, setWhiteboards] = useState<Whiteboard[]>([]);
    const [allWhiteboards, setAllWhiteboards] = useState<Whiteboard[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPage, settotalPage] = useState<number>(1);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [whiteboardError, setWhiteboardError] = useState<boolean>(false);

    const [createWhiteboardMutation] = useCreateWhiteboardMutation({
      variables:{
        name: ''
      }
    });

    const [getWhiteboardsQuery, {data, error}] = useGetWhiteboardsLazyQuery(
      {
        fetchPolicy: 'cache-and-network'
      }
    );

    const handleCreate = () =>{
      if (wbName){
        setWhiteboardError(false);
        createWhiteboardMutation({
          variables: {name: wbName},
        }).then(() =>{
          getWhiteboardsQuery();
        });
        setWbName("");
      }else{
        setWhiteboardError(true);
      }

    }

    useEffect(() => {
      getWhiteboardsQuery();
    }, [refresh]);

    useEffect(() =>{
      if (data)
        setAllWhiteboards(data?.GetWhiteboards);
    }, [data, error]);

    useEffect( () =>{
      if (data){
        let pg = Math.ceil(data.GetWhiteboards?.length/pageLimit);
        pg = pg ? pg : 1;
        settotalPage(pg);
  
        if (page > pg)
          setPage(pg);
  
        setWhiteboards(allWhiteboards.slice((page - 1)*pageLimit, (page)*pageLimit));
      }
    }, [allWhiteboards, page]);

    return (
      <Grid container spacing={3} justify='flex-start'>

        <Grid container className={classes.textArea} justify="center" spacing={4}>
            <Grid item xs={6}>
                <TextField 
                variant="outlined"
                label="Whiteboard Name"
                value={wbName}
                onChange={(e) => setWbName(e.target.value)}
                type="search"
                error={whiteboardError}
                helperText={'Whiteboard name cannot be empty'}
                fullWidth/>
            </Grid>
            <Grid item xs={1}>
              <Fab color="primary" aria-label="add" onClick={handleCreate}>
                  <AddIcon fontSize='large'/>
              </Fab>
            </Grid>
        </Grid>

        {whiteboards.map((whiteboard, index) => (
          <Grid item xs={3} key={index}>
            <WhiteboardCard refresh={refresh} setRefresh={setRefresh} whiteboard={whiteboard} />
          </Grid>
        ))}

        <Grid className={classes.paging} container justify="center">        
            <Pagination count={totalPage} color="primary" onChange={(_, pg) => setPage(pg)}/>
        </Grid>
      </Grid>
    );
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