import React, { useEffect, useState } from 'react'
import WorkspaceLayout from '../../src/components/workspace/WrokspaceLayout';
import WhiteboardDashboard from '../../src/components/workspace/WorkspaceDashboard';
import { useGetUserLazyQuery } from '../../src/generated/apolloComponents';
// import { useGetUserLazyQuery } from '../../src/generated/apolloComponents';
import { useRouter } from 'next/router';


const Workspace: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [GetUserQuery, {data}]  = useGetUserLazyQuery(
        {
          fetchPolicy: 'cache-and-network'
        }
    );
    useEffect(() => {
        const { uid } = router.query;
        GetUserQuery();
        if (data) {
            const uidMatch = uid == data.User.id;
            // authorized user needs to have id returned and same as the uid of workspace
            const isAuthorized = data && uidMatch;
            if (!isAuthorized) { 
                router.push('/');
            }
            else{
                setLoading(false);
            }
        }
    }, [data]);

    return (
        loading ? 
        <>
        </> :
        <WorkspaceLayout >
            <WhiteboardDashboard />
        </WorkspaceLayout>
    );
}

export default Workspace;