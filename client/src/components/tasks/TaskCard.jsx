import React from "react";
import {AiOutlineDelete} from 'react-icons/ai'
function TaskCard({ tasks, onDelete, onUpdate }) {
  const token = localStorage.getItem('token');
  const handleDelete = (taskId) => {
    // Lógica para manejar la eliminación de la tarea
    onDelete(taskId);
  };

  const handleUpdate = (taskId) => {
    // Lógica para manejar la actualización de la tarea
    onUpdate(taskId);
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="border-b border-gray-300 py-2 flex justify-between">
          <div>
            <h4 className="text-md font-medium">{task.title}</h4>
            <p className="text-gray-500">{task.description}</p>
          </div>
        
        </div>
      ))}
    </div>
  );
}

export default TaskCard;
