import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_PROJECT } from "../../graphql/projects";
import TaskListUser from "./TaskListUser";
import TaskForm from "../tasks/TaskForm";

function ProjectUser() {
  console.log("Project");
  const navigate=useNavigate()
  const token = localStorage.getItem("token");
  if(!token) {
    console.log("no esta logeado");
    navigate("/projects")
  }
  const { id } = useParams();
  console.log(id);
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });
  if (loading) return <p>loading</p>;
  if (error) return <p>console.error();</p>;
  console.log(data);
  return (
    <div className="max-w-xl mx-auto  p-6 bg-white rounded-md shadow-md">
      {token && <TaskForm  /> }
      <div>

      <h1 className="text-center text-lg text-indigo-600">PROJECT</h1>
      <h2 className="text-2xl font-bold mb-4 text-center">
        {" "}
        {data.project.name}
      </h2>
      <p className="text-gray-600">
        Descripción: {data.project.descripcion}
      </p>

      <TaskListUser tasks={data.project.tasks} projectId={id} />
      </div>
    </div>
  );
}

export default ProjectUser;
