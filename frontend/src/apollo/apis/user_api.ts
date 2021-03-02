import { useQuery, gql } from '@apollo/client';

const getHello = gql`
    query {
        hello
    }
`;

const Hello = () => {
    const { loading, error, data } = useQuery(getHello);
  
    if (loading) return "loading";
    if (error) return "error";

    return data.hello;
}

export { Hello , getHello};