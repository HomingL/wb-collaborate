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
  User: User;
  GetWhiteboard?: Maybe<Whiteboard>;
  GetWhiteboards: Array<Whiteboard>;
};


export type QueryGetWhiteboardArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  whiteboards?: Maybe<Array<Whiteboard>>;
};

export type Whiteboard = {
  __typename?: 'Whiteboard';
  id: Scalars['ID'];
  name: Scalars['String'];
  user: User;
  data?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  Signup: User;
  Signin: SigninResponse;
  CreateWhiteboard: Whiteboard;
  UpdateWhiteboard: Scalars['String'];
  DeleteWhiteboard: Scalars['String'];
};


export type MutationSignupArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};


export type MutationSigninArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateWhiteboardArgs = {
  name: Scalars['String'];
};


export type MutationUpdateWhiteboardArgs = {
  data: Scalars['String'];
  id: Scalars['String'];
};


export type MutationDeleteWhiteboardArgs = {
  id: Scalars['String'];
};

export type SigninResponse = {
  __typename?: 'SigninResponse';
  user: User;
  token: Scalars['String'];
};

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { Signup: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
  ) }
);

export type SigninMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SigninMutation = (
  { __typename?: 'Mutation' }
  & { Signin: (
    { __typename?: 'SigninResponse' }
    & Pick<SigninResponse, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    ) }
  ) }
);

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { User: (
    { __typename?: 'User' }
    & Pick<User, 'name' | 'email'>
  ) }
);

export type CreateWhiteboardMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateWhiteboardMutation = (
  { __typename?: 'Mutation' }
  & { CreateWhiteboard: (
    { __typename?: 'Whiteboard' }
    & Pick<Whiteboard, 'id' | 'data'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    ) }
  ) }
);

export type UpdateWhiteboardMutationVariables = Exact<{
  id: Scalars['String'];
  data: Scalars['String'];
}>;


export type UpdateWhiteboardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'UpdateWhiteboard'>
);

export type GetWhiteboardQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetWhiteboardQuery = (
  { __typename?: 'Query' }
  & { GetWhiteboard?: Maybe<(
    { __typename?: 'Whiteboard' }
    & Pick<Whiteboard, 'name' | 'data'>
  )> }
);

export type GetWhiteboardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWhiteboardsQuery = (
  { __typename?: 'Query' }
  & { GetWhiteboards: Array<(
    { __typename?: 'Whiteboard' }
    & Pick<Whiteboard, 'id' | 'name' | 'data'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    ) }
  )> }
);


export const SignupDocument = gql`
    mutation Signup($email: String!, $password: String!, $name: String!) {
  Signup(email: $email, password: $password, name: $name) {
    id
    name
    email
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, baseOptions);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const SigninDocument = gql`
    mutation Signin($email: String!, $password: String!) {
  Signin(email: $email, password: $password) {
    user {
      id
      name
      email
    }
    token
  }
}
    `;
export type SigninMutationFn = Apollo.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, baseOptions);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const GetUserDocument = gql`
    query GetUser {
  User {
    name
    email
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const CreateWhiteboardDocument = gql`
    mutation CreateWhiteboard($name: String!) {
  CreateWhiteboard(name: $name) {
    id
    data
    user {
      id
      name
      email
    }
  }
}
    `;
export type CreateWhiteboardMutationFn = Apollo.MutationFunction<CreateWhiteboardMutation, CreateWhiteboardMutationVariables>;

/**
 * __useCreateWhiteboardMutation__
 *
 * To run a mutation, you first call `useCreateWhiteboardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWhiteboardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWhiteboardMutation, { data, loading, error }] = useCreateWhiteboardMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateWhiteboardMutation(baseOptions?: Apollo.MutationHookOptions<CreateWhiteboardMutation, CreateWhiteboardMutationVariables>) {
        return Apollo.useMutation<CreateWhiteboardMutation, CreateWhiteboardMutationVariables>(CreateWhiteboardDocument, baseOptions);
      }
export type CreateWhiteboardMutationHookResult = ReturnType<typeof useCreateWhiteboardMutation>;
export type CreateWhiteboardMutationResult = Apollo.MutationResult<CreateWhiteboardMutation>;
export type CreateWhiteboardMutationOptions = Apollo.BaseMutationOptions<CreateWhiteboardMutation, CreateWhiteboardMutationVariables>;
export const UpdateWhiteboardDocument = gql`
    mutation UpdateWhiteboard($id: String!, $data: String!) {
  UpdateWhiteboard(id: $id, data: $data)
}
    `;
export type UpdateWhiteboardMutationFn = Apollo.MutationFunction<UpdateWhiteboardMutation, UpdateWhiteboardMutationVariables>;

/**
 * __useUpdateWhiteboardMutation__
 *
 * To run a mutation, you first call `useUpdateWhiteboardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWhiteboardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWhiteboardMutation, { data, loading, error }] = useUpdateWhiteboardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateWhiteboardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWhiteboardMutation, UpdateWhiteboardMutationVariables>) {
        return Apollo.useMutation<UpdateWhiteboardMutation, UpdateWhiteboardMutationVariables>(UpdateWhiteboardDocument, baseOptions);
      }
export type UpdateWhiteboardMutationHookResult = ReturnType<typeof useUpdateWhiteboardMutation>;
export type UpdateWhiteboardMutationResult = Apollo.MutationResult<UpdateWhiteboardMutation>;
export type UpdateWhiteboardMutationOptions = Apollo.BaseMutationOptions<UpdateWhiteboardMutation, UpdateWhiteboardMutationVariables>;
export const GetWhiteboardDocument = gql`
    query GetWhiteboard($id: String!) {
  GetWhiteboard(id: $id) {
    name
    data
  }
}
    `;

/**
 * __useGetWhiteboardQuery__
 *
 * To run a query within a React component, call `useGetWhiteboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWhiteboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWhiteboardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetWhiteboardQuery(baseOptions: Apollo.QueryHookOptions<GetWhiteboardQuery, GetWhiteboardQueryVariables>) {
        return Apollo.useQuery<GetWhiteboardQuery, GetWhiteboardQueryVariables>(GetWhiteboardDocument, baseOptions);
      }
export function useGetWhiteboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWhiteboardQuery, GetWhiteboardQueryVariables>) {
          return Apollo.useLazyQuery<GetWhiteboardQuery, GetWhiteboardQueryVariables>(GetWhiteboardDocument, baseOptions);
        }
export type GetWhiteboardQueryHookResult = ReturnType<typeof useGetWhiteboardQuery>;
export type GetWhiteboardLazyQueryHookResult = ReturnType<typeof useGetWhiteboardLazyQuery>;
export type GetWhiteboardQueryResult = Apollo.QueryResult<GetWhiteboardQuery, GetWhiteboardQueryVariables>;
export const GetWhiteboardsDocument = gql`
    query GetWhiteboards {
  GetWhiteboards {
    id
    name
    data
    user {
      id
      name
      email
    }
  }
}
    `;

/**
 * __useGetWhiteboardsQuery__
 *
 * To run a query within a React component, call `useGetWhiteboardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWhiteboardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWhiteboardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWhiteboardsQuery(baseOptions?: Apollo.QueryHookOptions<GetWhiteboardsQuery, GetWhiteboardsQueryVariables>) {
        return Apollo.useQuery<GetWhiteboardsQuery, GetWhiteboardsQueryVariables>(GetWhiteboardsDocument, baseOptions);
      }
export function useGetWhiteboardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWhiteboardsQuery, GetWhiteboardsQueryVariables>) {
          return Apollo.useLazyQuery<GetWhiteboardsQuery, GetWhiteboardsQueryVariables>(GetWhiteboardsDocument, baseOptions);
        }
export type GetWhiteboardsQueryHookResult = ReturnType<typeof useGetWhiteboardsQuery>;
export type GetWhiteboardsLazyQueryHookResult = ReturnType<typeof useGetWhiteboardsLazyQuery>;
export type GetWhiteboardsQueryResult = Apollo.QueryResult<GetWhiteboardsQuery, GetWhiteboardsQueryVariables>;