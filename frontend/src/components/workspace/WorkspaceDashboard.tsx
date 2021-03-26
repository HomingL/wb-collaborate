import React from 'react'
import { Grid } from '@material-ui/core';
import WhiteboardCard from './WhiteboardCard';



interface WorkspaceDashboardProps {
  whiteboards: Whiteboard[]
}

const WorkspaceDashboard: React.FC<WorkspaceDashboardProps> = ({ whiteboards }) => {
    console.log(whiteboards[0].name);
    return (
      <Grid container spacing={3} justify='flex-start'>
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
  
export default WorkspaceDashboard