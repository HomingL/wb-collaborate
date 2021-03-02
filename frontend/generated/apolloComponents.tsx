import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
};

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);


export const Document = gql`
    {
  hello
}
    `;

/**
 * __useQuery__
 *
 * To run a query within a React component, call `useQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuery(baseOptions?: Apollo.QueryHookOptions<Query, QueryVariables>) {
        return Apollo.useQuery<Query, QueryVariables>(Document, baseOptions);
      }
export function useLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Query, QueryVariables>) {
          return Apollo.useLazyQuery<Query, QueryVariables>(Document, baseOptions);
        }
export type QueryHookResult = ReturnType<typeof useQuery>;
export type LazyQueryHookResult = ReturnType<typeof useLazyQuery>;
export type QueryResult = Apollo.QueryResult<Query, QueryVariables>;