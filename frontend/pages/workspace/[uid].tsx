import React, { useEffect, useState } from 'react'
import WorkspaceLayout from '../../src/components/workspace/WrokspaceLayout';
import WhiteboardDashboard from '../../src/components/workspace/WorkspaceDashboard';
import { useGetUserLazyQuery } from '../../src/generated/apolloComponents';
// import { useGetUserLazyQuery } from '../../src/generated/apolloComponents';
import { useRouter } from 'next/router';
import { CircularProgress, Grid } from '@material-ui/core';
import ErrorMessage from '../../src/components/dialog/ErrorMessage';


const Workspace: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [expired, setExpired] = useState<boolean>(false);
    const [getUserQuery, {data, error}]  = useGetUserLazyQuery(
        {
          fetchPolicy: 'cache-and-network'
        }
    );

    useEffect(() => {
        getUserQuery();
    }, []);

    useEffect(() => {
        const { uid } = router.query;
        if (error) {
            setExpired(true);
            setTimeout(() => router.push('/'), 3000);
        }
        if (data) {
            const uidMatch = (uid === data.User.id);
            // authorized user needs to have id returned and same as the uid of workspace
            const isAuthorized = data && uidMatch;
            if (!isAuthorized) { 
                router.push('/');
            }
            else{
                setLoading(false);
            }
        }
    }, [data, error]);

    return (
        loading ? 
        <>
            <ErrorMessage occur={expired} onClose={() => router.push('/')}>
                Session Expired! Redirecting to login page...
            </ErrorMessage>
            <Grid container alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
                <CircularProgress />
            </Grid>
        </> :
        <WorkspaceLayout>
            <ErrorMessage occur={expired} onClose={() => router.push('/')}>
                Session Expired! Redirecting to login page...
            </ErrorMessage>
            <WhiteboardDashboard />
        </WorkspaceLayout>
    );
}

export default Workspace;