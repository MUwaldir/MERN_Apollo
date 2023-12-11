import Project from "../src/models/Project.model.js";
import Task from "../src/models/task.model.js";
import User from "../src/models/user.model.js";
import bcrypt from "bcrypt";
import createToken from "../src/token/createToken.js";
// import {ApolloServerErrorCode } from '@apollo/server'
import { GraphQLError } from "graphql";

export const resolvers = {
  Query: {
    hello: () => "hello welcome graphql",
    projectCount: () => Project.collection.countDocuments(),
    allProjects: async (root, args, context) => {
      return await Project.find()
      
    },
    allProjectsByUser: async (root, args, context) => {

      // console.log(context);
      console.log('userrrrrrrrrrrr:  '+ context.currentUser)
      const { _id } = context.currentUser;
      return await Project.find({ userId: _id.toString() });
      // return await Project.findById();
    },
    tasks: async (root, args) => await Task.find(),
    project: async (root, args) => await Project.findById(args._id),
    task: async (root, args) => Task.findById(args._id),
    user: async (root, args) => await User.findById(args._id),
    allUsers: async (root, args, context) => {
      // console.log(context);
      return await User.find();
    },

    currentUser: (root, args, context) => {
      // console.log(context);
      return context.currentUser;
    },
  },
  Mutation: {
    createProject: async (root, args, context) => {
      console.log(context);
      const { currentUser } = context;
      console.log(currentUser);
      if (!currentUser) throw new GraphQLError("not logged in");
      const foundUser = await User.findById(args.userId);
      if (!foundUser) throw new Error("User not found");
      const project = new Project({ ...args });
      try {
        await project.save();
      } catch (error) {
        console.error(error);
      }
      return project;
    },

    createTask: async (root, args, context) => {
      console.log(args);
      console.log(args.projectId);
      const { currentUser } = context;
      console.log(currentUser);
      if (!currentUser) throw new GraphQLError("not logged in");
      const projectFound = await Project.findById(args.projectId);
      if (!projectFound) throw new Error(`Project not found`);
      const task = new Task({
        ...args,
      });
      try {
        const taskSave = await task.save();
        return taskSave;
      } catch (error) {
        console.log(error);
      }
    },
    createUser: async (root, args) => {
      console.log(args);

      const userFound = await User.findOne({ username: args.username });
      const userEmail = await User.findOne({ email: args.email });
      if (userFound) throw new Error(`User ${args.username} is existing`);
      if (userEmail) throw new Error(`Email ${args.email} is existing`);

      const hashedPassword = await bcrypt.hash(args.password, 10);
      const newUser = new User({ ...args, password: hashedPassword });

      try {
        const userSave = await newUser.save();
        return userSave;
      } catch (error) {
        console.log(error);
      }
    },

    deleteproject: async (root, args) => {
      const deleteproject = await Project.findByIdAndDelete(args._id);
      if (!deleteproject) throw new Error("Project not found");
       // Eliminar las tareas asociadas al proyecto
      await Task.deleteMany({ projectId: args._id });
      return deleteproject;
    },
    deleteTask: async (root, args) => {
      const deleteTask = await Task.findByIdAndDelete(args._id);
      if (!deleteTask) throw new Error("Task not found");
      return deleteTask;
    },
    updateProject: async (root, args) => {
      const updateProject = await Project.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updateProject) throw new Error("Project not updated");
      return updateProject;
    },
    updateTask: async (root, args) => {
      const updateTask = await Task.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updateTask) throw new Error("Task not updated");

      return updateTask;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user) {
        throw new GraphQLError("Usuario no encontrado");
      }

      const passwordMatch = await bcrypt.compare(args.password, user.password);
      if (!passwordMatch) {
        throw new GraphQLError("Credenciales inválidas");
      }

      const userData = {
        username: user.username,
        id: user._id,
      };
    
      const userForToken = await createToken(userData);
     
      return {
        value: userForToken,
        userId: user._id,
      };
    },
  },
  Project: {
    tasks: async (parent) => {
      const tasks = await Task.find({ projectId: parent._id });
      return tasks;
    },
  },
  Task: {
    project: async (parent) => await Project.findById(parent.projectId),
  },

  User: {
    allProjects: async (parent) => {
      return await Project.find({ userId: parent._id });
    },
  },
};
