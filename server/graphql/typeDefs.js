import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: String
    projectCount: Int!
    project(_id: ID!):Project
    task(_id: ID!):Task
    allProjects: [Project!]
    tasks: [Task!]
    user(_id: ID!):User
    allUsers: [User!]
    currentUser: User
    allProjectsByUser:[Project!]
  }

  type Mutation {
    createProject(name: String!,descripcion: String!,userId:ID!):Project
    createTask(title: String!,description: String!,projectId:ID!,userId:ID! ):Task
    deleteproject(_id:ID!):Project
    deleteTask(_id:ID!):Task
    updateProject(_id:ID!,name:String,descripcion:String):Project
    updateTask(_id:ID!,title:String,description:String):Task
    createUser(username:String!,email:String!,password:String!):User
    login(username: String!, password: String!): Token
  }

  type Project {
    _id:ID
    name: String!
    descripcion: String
    createdAt:String
    updatedAt:String
    userId:String
    user:User
    tasks:[Task]
    taskCount:String
  }
  type Task {
    _id:ID
    title: String!
    description: String
    date: String
    project:Project
    projectId:String
    user:User
    createdAt:String
    updatedAt:String	
  }

  type User {
    _id:ID
    username:String!
    email:String!
    password:String!
    createdAt:String
    updatedAt:String
    allProjects:[Project]
  }
  type Token {
    value: String!,
    userId:String!
  }

`;
