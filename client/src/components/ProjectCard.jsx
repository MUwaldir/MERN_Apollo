import { useMutation } from "@apollo/client";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { DELETE_PROJECT } from "../graphql/projects";

function ProjectCard({ project }) {
  console.log(project);
  const navigate = useNavigate();

  return (
    <div className="rounded-md w-full my-4 p-4 h-50 ">
      
      <div
        className=" rounded border-spacing-1 p-4 bg-gray-300"
        onClick={() => navigate(`/project/${project._id}`)}
      >
        <h2>
          <strong>Project:</strong> {project.name}
        </h2>
        <p>
          <strong>Decripción:</strong> {project.descripcion}
        </p>
        <p>Taks: {Array.isArray(project.tasks) ? project.tasks.length : 0}</p>
      </div>

    

    </div>
  );
}

export default ProjectCard;
