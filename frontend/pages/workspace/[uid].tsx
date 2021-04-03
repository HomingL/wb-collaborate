import React from 'react'
import WorkspaceLayout from '../../src/components/workspace/WrokspaceLayout';
import WhiteboardDashboard from '../../src/components/workspace/WorkspaceDashboard';


const Workspace: React.FC = () => {

    return (
        <WorkspaceLayout >
            <WhiteboardDashboard />
        </WorkspaceLayout>
    );
}

export default Workspace;