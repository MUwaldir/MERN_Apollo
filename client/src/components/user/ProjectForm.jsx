import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_PROJECT,
  GET_PROJECTS,
  GET_PROJECT_USER,
} from "../../graphql/projects";

function ProjectForm({refetch}) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [projectData, setProjectData] = useState({
    name: "",
    descripcion: "",
    userId: userId,
  });

  const [createProject] = useMutation(CREATE_PROJECT, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      await createProject({
        variables: {
          name: projectData.name,
          descripcion: projectData.descripcion,
          userId: projectData.userId,
        },
        refetchQueries:["GetProjectUser", "GetProjects"]
      });

      // Limpiar el formulario después de la creación del proyecto
      setProjectData({
        name: "",
        descripcion: "",
        userId
      });
      refetch();
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Crear Proyecto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Nombre del Proyecto:
          </label>
          <input
            type="text"
            name="name"
            value={projectData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Descripción:
          </label>
          <textarea
            name="descripcion"
            value={projectData.descripcion}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Crear Proyecto
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;
