import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  posts: Array<Post>;
  post?: Maybe<Post>;
  me: UserResponse;
};

export type QueryPostArgs = {
  id: Scalars["Int"];
};

export type Post = {
  __typename?: "Post";
  id: Scalars["Int"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  title: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  user?: Maybe<User>;
  errors?: Maybe<Array<FieldError>>;
};

export type User = {
  __typename?: "User";
  id: Scalars["Int"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  username: Scalars["String"];
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  create: Post;
  update?: Maybe<Post>;
  delete: Scalars["Boolean"];
  login: UserResponse;
  register: UserResponse;
};

export type MutationCreateArgs = {
  title: Scalars["String"];
};

export type MutationUpdateArgs = {
  title: Scalars["String"];
  id: Scalars["Int"];
};

export type MutationDeleteArgs = {
  id: Scalars["Float"];
};

export type MutationLoginArgs = {
  input: UsernamePasswordInput;
};

export type MutationRegisterArgs = {
  input: UsernamePasswordInput;
};

export type UsernamePasswordInput = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "UserResponse" } & {
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >;
    user?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "username">>;
  };
};

export type RegisterMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserResponse" } & {
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >;
    user?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "username">>;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me: { __typename?: "UserResponse" } & {
    user?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "username">>;
  };
};

export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        id
        username
      }
    }
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const RegisterDocument = gql`
  mutation Register($username: String!, $password: String!) {
    register(input: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        id
        username
      }
    }
  }
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const MeDocument = gql`
  query Me {
    me {
      user {
        id
        username
      }
    }
  }
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
