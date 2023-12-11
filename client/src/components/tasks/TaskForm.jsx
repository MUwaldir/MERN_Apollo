import React, { useState } from "react";
import { CREATE_TASK } from "../../graphql/projects";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";


function TaskForm() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  console.log(token);
  const { id } = useParams();
  // const [createTask] = useMutation(CREATE_TASK)
  const [taskData, setTaskData] = useState({
    userId: userId, // Aquí deberías obtener el userId de alguna manera (puede ser almacenado en el estado global, etc.)
    projectId: id,
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "", // Agregar el token solo si está presente
      },
    },
    refetchQueries: ["GetProject"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(taskData);
    try {
      await createTask({ variables: taskData });
      // Limpiar el formulario después de la creación del proyecto
    //   setTaskData({
    //     userId: "6515a0f4cac32a1a312e8952",
    //     projectId: id,
    //     title: "",
    //     description: "",
    //   });
    setTaskData({
        userId: userId,
        projectId: id,
        title: "",
        description: "",
      });
    e.target.title.focus();
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
    // Aquí puedes manejar la lógica para enviar los datos del formulario (p. ej., a través de una función de creación de tarea)
    // handleTaskCreation(taskData);
    // También puedes restablecer el estado del formulario después de enviar los datos
    // setTaskData({
    //   userId: '',
    //   projectId: '',
    //   title: '',
    //   description: '',
    // });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md"
    >
      <h2 className="text-lg font-semibold mb-4 text-center">Crear Tarea</h2>

      {/* UserId (si es estático, de lo contrario, podrías ocultarlo) */}
      {/* <input
        type="text"
        name="userId"
        value={taskData.userId}
        onChange={handleChange}
        placeholder="User ID"
        className="w-full p-2 mb-4 border rounded-md"
      /> */}

      {/* ProjectId */}
      {/* <input
        type="text"
        name="projectId"
        value={taskData.projectId}
        onChange={handleChange}
        placeholder="Project ID"
        className="w-full p-2 mb-4 border rounded-md"
      /> */}

      {/* Title */}
      <input
        type="text"
        name="title"
        value={taskData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 mb-4 border rounded-md"
      />

      {/* Description */}
      <textarea
        name="description"
        value={taskData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 mb-4 border rounded-md"
        rows="4"
      ></textarea>

      {/* Botón de envío */}
      <button
        type="submit"
        className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Crear Tarea
      </button>
    </form>
  );
}

export default TaskForm;
