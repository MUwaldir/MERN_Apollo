import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";
import { UPDATE_TASK } from "../../graphql/projects";

function TaskCardUser({ tasks, onDelete }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const [updateTasks, { loading, error }] = useMutation(UPDATE_TASK);
  const token = localStorage.getItem("token");

  const handleDelete = (taskId) => {
    onDelete(taskId);
  };

  const handleUpdate = (task) => {
    setSelectedTask(task._id);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setUpdatedTitle("");
    setUpdatedDescription("");
    setIsModalVisible(false);
  };

  const handleTitleChange = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setUpdatedDescription(e.target.value);
  };

  const handleSubmit = async () => {
    await updateTasks({
      variables: {
        id: selectedTask,
        title: updatedTitle,
        description: updatedDescription,
      },
    });
    // Lógica para enviar la actualización al servidor GraphQL
    // Puedes utilizar una función para enviar la actualización al servidor aquí
    // ...
    closeModal(); // Cierra el modal después de la actualización
  };

  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task._id}
          className="border-b border-gray-300 py-2 flex justify-between"
        >
          <div>
            <h4 className="text-md font-medium">{task.title}</h4>
            <p className="text-gray-500">{task.description}</p>
          </div>
          {token && (
            <div className="flex gap-x-2">
              <button
                onClick={() => handleUpdate(task)}
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
              >
                <IoEyeSharp />
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
              >
                <AiOutlineDelete />
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Modal para la actualización */}
      {isModalVisible && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-lg">
              <div className="bg-white p-6">
                <h2 className="text-lg font-semibold mb-4">Actualizar Tarea</h2>
                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Título:
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={updatedTitle}
                      onChange={handleTitleChange}
                      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Descripción:
                    </label>
                    <textarea
                      id="description"
                      value={updatedDescription}
                      onChange={handleDescriptionChange}
                      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Actualizar
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                    >
                      Cerrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCardUser;
