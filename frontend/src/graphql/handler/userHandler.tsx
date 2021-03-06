import React from 'react'
import { useGetUserQuery } from '../../generated/apolloComponents'

export async function getStaticProps() {
    const { data } = useGetUserQuery();
    return {
      props: {
        data
      }
    }
}

interface GetUserHandlerProps{
    name: string,
    email: string,
}

const GetUserHandler: React.FC<GetUserHandlerProps> = ({ name, email }) => {
    return <>The user: {name} has email {email}</>
}

export { GetUserHandler};