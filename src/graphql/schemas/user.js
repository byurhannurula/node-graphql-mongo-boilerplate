import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    me: User
    user(id: ID!): User
    users: [User]!
  }

  extend type Mutation {
    logout: Boolean!
    login(email: String!, password: String!): UserResponse!
    register(email: String!, password: String!): UserResponse!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    avatar: String
    createdAt: String!
    updatedAt: String!
  }

  type ErrorField {
    path: String
    message: String
  }

  type UserResponse {
    error: [ErrorField]
    user: User
  }
`;
