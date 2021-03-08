import React from 'react'
import { GetUserHandler } from '../../src/graphql/handler/userHandler'

interface WorkspaceProps {

}

const Workspace: React.FC<WorkspaceProps> = ({}) => {
    return <GetUserHandler/>;
}

export default Workspace;