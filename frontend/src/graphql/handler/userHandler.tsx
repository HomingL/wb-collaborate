import React from 'react'
import { useGetUserQuery } from '../../generated/apolloComponents'

const GetUserHandler: React.FC = () => {
    const { loading, error, data } = useGetUserQuery();
  
    if (loading) return <>loading</>
    if (error) return <>error</>
    if (!data) return <></>

    return <>The user: {data.User.name} has email {data.User.email}</>
}

export { GetUserHandler};