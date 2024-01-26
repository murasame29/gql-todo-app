import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo?: Maybe<Todo>;
  deleteTodo?: Maybe<Todo>;
  updateTodo?: Maybe<Todo>;
};


export type MutationCreateTodoArgs = {
  input: TodoInput;
};


export type MutationDeleteTodoArgs = {
  todo_id: Scalars['Int']['input'];
};


export type MutationUpdateTodoArgs = {
  input: TodoUpdateInput;
  todo_id: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  getTodoById?: Maybe<Todo>;
  getTodos?: Maybe<Array<Maybe<Todo>>>;
};


export type QueryGetTodoByIdArgs = {
  todo_id: Scalars['Int']['input'];
};


export type QueryGetTodosArgs = {
  page_id?: InputMaybe<Scalars['Int']['input']>;
  page_size?: InputMaybe<Scalars['Int']['input']>;
  solved?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Todo = {
  __typename?: 'Todo';
  created_at: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  is_deleted: Scalars['Boolean']['output'];
  is_solved: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  todo_id: Scalars['Int']['output'];
  updated_at: Scalars['String']['output'];
};

export type TodoInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['Upload']['input']>;
  title: Scalars['String']['input'];
};

export type TodoUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['Upload']['input']>;
  is_solved?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};

export type GetTodosQueryVariables = Exact<{
  solved?: InputMaybe<Scalars['Boolean']['input']>;
  page_size?: InputMaybe<Scalars['Int']['input']>;
  page_id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTodosQuery = { __typename?: 'Query', getTodos?: Array<{ __typename?: 'Todo', todo_id: number, title: string, description?: string | null, image?: string | null, is_solved: boolean } | null> | null };

export type GetTodoByIdQueryVariables = Exact<{
  todo_id: Scalars['Int']['input'];
}>;


export type GetTodoByIdQuery = { __typename?: 'Query', getTodoById?: { __typename?: 'Todo', todo_id: number, title: string, description?: string | null, image?: string | null, is_solved: boolean } | null };

export type CreateTodoMutationVariables = Exact<{
  input: TodoInput;
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo?: { __typename?: 'Todo', todo_id: number, title: string, description?: string | null, image?: string | null, is_solved: boolean } | null };

export type UpdateTodoMutationVariables = Exact<{
  todo_id: Scalars['Int']['input'];
  input: TodoUpdateInput;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo?: { __typename?: 'Todo', todo_id: number, title: string, description?: string | null, image?: string | null, is_solved: boolean } | null };

export type DeleteTodoMutationVariables = Exact<{
  todo_id: Scalars['Int']['input'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo?: { __typename?: 'Todo', todo_id: number, title: string, description?: string | null, image?: string | null, is_solved: boolean } | null };


export const GetTodosDocument = gql`
    query GetTodos($solved: Boolean, $page_size: Int, $page_id: Int) {
  getTodos(solved: $solved, page_size: $page_size, page_id: $page_id) {
    todo_id
    title
    description
    image
    is_solved
  }
}
    `;

/**
 * __useGetTodosQuery__
 *
 * To run a query within a React component, call `useGetTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodosQuery({
 *   variables: {
 *      solved: // value for 'solved'
 *      page_size: // value for 'page_size'
 *      page_id: // value for 'page_id'
 *   },
 * });
 */
export function useGetTodosQuery(baseOptions?: Apollo.QueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
      }
export function useGetTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
        }
export function useGetTodosSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
        }
export type GetTodosQueryHookResult = ReturnType<typeof useGetTodosQuery>;
export type GetTodosLazyQueryHookResult = ReturnType<typeof useGetTodosLazyQuery>;
export type GetTodosSuspenseQueryHookResult = ReturnType<typeof useGetTodosSuspenseQuery>;
export type GetTodosQueryResult = Apollo.QueryResult<GetTodosQuery, GetTodosQueryVariables>;
export const GetTodoByIdDocument = gql`
    query GetTodoById($todo_id: Int!) {
  getTodoById(todo_id: $todo_id) {
    todo_id
    title
    description
    image
    is_solved
  }
}
    `;

/**
 * __useGetTodoByIdQuery__
 *
 * To run a query within a React component, call `useGetTodoByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodoByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodoByIdQuery({
 *   variables: {
 *      todo_id: // value for 'todo_id'
 *   },
 * });
 */
export function useGetTodoByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTodoByIdQuery, GetTodoByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTodoByIdQuery, GetTodoByIdQueryVariables>(GetTodoByIdDocument, options);
      }
export function useGetTodoByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodoByIdQuery, GetTodoByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTodoByIdQuery, GetTodoByIdQueryVariables>(GetTodoByIdDocument, options);
        }
export function useGetTodoByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTodoByIdQuery, GetTodoByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTodoByIdQuery, GetTodoByIdQueryVariables>(GetTodoByIdDocument, options);
        }
export type GetTodoByIdQueryHookResult = ReturnType<typeof useGetTodoByIdQuery>;
export type GetTodoByIdLazyQueryHookResult = ReturnType<typeof useGetTodoByIdLazyQuery>;
export type GetTodoByIdSuspenseQueryHookResult = ReturnType<typeof useGetTodoByIdSuspenseQuery>;
export type GetTodoByIdQueryResult = Apollo.QueryResult<GetTodoByIdQuery, GetTodoByIdQueryVariables>;
export const CreateTodoDocument = gql`
    mutation CreateTodo($input: TodoInput!) {
  createTodo(input: $input) {
    todo_id
    title
    description
    image
    is_solved
  }
}
    `;
export type CreateTodoMutationFn = Apollo.MutationFunction<CreateTodoMutation, CreateTodoMutationVariables>;

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTodoMutation(baseOptions?: Apollo.MutationHookOptions<CreateTodoMutation, CreateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument, options);
      }
export type CreateTodoMutationHookResult = ReturnType<typeof useCreateTodoMutation>;
export type CreateTodoMutationResult = Apollo.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<CreateTodoMutation, CreateTodoMutationVariables>;
export const UpdateTodoDocument = gql`
    mutation UpdateTodo($todo_id: Int!, $input: TodoUpdateInput!) {
  updateTodo(todo_id: $todo_id, input: $input) {
    todo_id
    title
    description
    image
    is_solved
  }
}
    `;
export type UpdateTodoMutationFn = Apollo.MutationFunction<UpdateTodoMutation, UpdateTodoMutationVariables>;

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      todo_id: // value for 'todo_id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTodoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTodoMutation, UpdateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, options);
      }
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>;
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<UpdateTodoMutation, UpdateTodoMutationVariables>;
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($todo_id: Int!) {
  deleteTodo(todo_id: $todo_id) {
    todo_id
    title
    description
    image
    is_solved
  }
}
    `;
export type DeleteTodoMutationFn = Apollo.MutationFunction<DeleteTodoMutation, DeleteTodoMutationVariables>;

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      todo_id: // value for 'todo_id'
 *   },
 * });
 */
export function useDeleteTodoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTodoMutation, DeleteTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, options);
      }
export type DeleteTodoMutationHookResult = ReturnType<typeof useDeleteTodoMutation>;
export type DeleteTodoMutationResult = Apollo.MutationResult<DeleteTodoMutation>;
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<DeleteTodoMutation, DeleteTodoMutationVariables>;