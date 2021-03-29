import React from 'react'
import WorkspaceLayout from '../../src/components/workspace/WrokspaceLayout';
import WhiteboardDashboard from '../../src/components/workspace/WorkspaceDashboard';


const Workspace: React.FC = () => {
    const Whiteboards = [{name: "asdfasdf"},{name: "name2"},{name: "name3"},{name: "name4"},{name: "name5"},{name: "name6"},{name: "name7"},];
    return (
        <WorkspaceLayout >
            <WhiteboardDashboard whiteboards={Whiteboards} />
        </WorkspaceLayout>
    );
}

export default Workspace;