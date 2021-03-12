import React from 'react'
import { useGetUserQuery } from '../../generated/apolloComponents'

// export async function getStaticProps() {
//     const { data } = useGetUserQuery();
//     return {
//       props: {
//         data
//       }
//     }
// }

// interface GetUserHandlerProps{
//     name: string,
//     email: string,
// }

const GetUserHandler = () => {
  const { data, error, loading } = useGetUserQuery();
    
    if (loading) return <> loading... </>;
    if (error) return <div>error?.message</div>;
    return <div>The user: {data?.User.name} has email {data?.User.email}</div>
}

export { GetUserHandler };