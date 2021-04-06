import React, { useEffect, useState } from 'react'
import WorkspaceLayout from '../../src/components/workspace/WrokspaceLayout';
import WhiteboardDashboard from '../../src/components/workspace/WorkspaceDashboard';
import { useGetUserLazyQuery } from '../../src/generated/apolloComponents';
// import { useGetUserLazyQuery } from '../../src/generated/apolloComponents';
import { useRouter } from 'next/router';


const Workspace: React.FC = () => {
    const Whiteboards = [{name: "asdfasdf"},{name: "name2"},{name: "name3"},{name: "name4"},{name: "name5"},{name: "name6"},{name: "name7"},];
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    // const [user, setUser] = useState<any>(null);
    const [GetUserQuery, {data}]  = useGetUserLazyQuery(
        {
          fetchPolicy: 'cache-and-network'
        }
    );
    useEffect(() => {
        const { uid } = router.query;
        GetUserQuery();
        // setUser(data?.User);
        console.log(data);
        console.log('uid:', uid);
        // console.log('user now:', user);
        console.log('loading', loading);
        if (data) {
            console.log("user id", data.User.id, uid);
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
            <WhiteboardDashboard whiteboards={Whiteboards} />
        </WorkspaceLayout>
    );
}

export default Workspace;