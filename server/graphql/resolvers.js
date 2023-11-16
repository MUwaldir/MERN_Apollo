import Project from "../src/models/Project.model.js";
import Task from "../src/models/task.model.js";
import User from "../src/models/user.model.js";

export const resolvers = {
  Query: {
    hello: () => "hello welcome graphql",
    projectCount: () => Project.collection.countDocuments(),
    allProjects: async (root, args) => {
      return await Project.find();
    },
    tasks: async (root, args) => await Task.find(),
    project: async (root, args) => await Project.findById(args._id),
    task: async (root, args) => Task.findById(args._id),
    user: async (root, args) => await User.findById(args._id),
    allUsers: async (root, args) => await User.find(),
  },
  Mutation: {
    createProject: async (root, args) => {
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

    createTask: async (root, args) => {
      console.log(args);
      console.log(args.projectId);
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

    deleteproject: async (root, args) => {
      const deleteproject = await Project.findByIdAndDelete(args._id);
      if (!deleteproject) throw new Error("Project not found");
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
