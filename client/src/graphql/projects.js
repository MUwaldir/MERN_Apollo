import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      _id
      username
    }
  }
`;

export const GET_PROJECTS = gql`
  query GetProjects {
    allProjects {
      _id
      name
      descripcion
      tasks{
        _id
        title
        description
      }
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(_id: $id) {
      _id
      name
      descripcion
      tasks {
        _id
        title
        description
      }
    }
  }
`;

export const GET_PROJECT_USER = gql`
  query GetProjectUser {
    allProjectsByUser {
      _id
      name
      descripcion
      createdAt
      updatedAt
      userId
      tasks {
        _id
        title
        description
        createdAt
        updatedAt
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation ($name: String!, $descripcion: String!, $userId: ID!) {
    createProject(name: $name, descripcion: $descripcion, userId: $userId) {
      _id
      name
      descripcion
    }
  }
`;

export const CREATE_TASK = gql`
  mutation (
    $title: String!
    $description: String!
    $projectId: ID!
    $userId: ID!
  ) {
    createTask(
      title: $title
      description: $description
      projectId: $projectId
      userId: $userId
    ) {
      _id
      title
      description
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation ($id: ID!) {
    deleteproject(_id: $id) {
      _id
      name
    }
  }
`;

export const DELETE_TASK = gql`
  mutation ($id: ID!) {
    deleteTask(_id: $id) {
      _id
      title
    }
  }
`;

export const UPDATE_TASK = gql`
mutation UpdateTask($id: ID!, $title: String, $description: String, ) {
  updateTask(_id: $id, title: $title, description: $description) {
   _id
   title
   description
  }
}
`

export const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      userId
    }
  }
`;

export const GET_USER = gql`
  query get_user($id: ID!) {
    user(_id: $id) {
      _id
      username
      email
    }
  }
`;
