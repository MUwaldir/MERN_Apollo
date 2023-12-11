
import { useMutation } from "@apollo/client";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import { DELETE_PROJECT } from "../../graphql/projects";


function ProjectCardUser({ project }) {
  console.log(project);
  const navigate = useNavigate();
  const [deleteProject,{loading,error}] = useMutation(DELETE_PROJECT,{
    refetchQueries:["GetProjectUser","GetProjects"]
  })

  const handleDeleteProject =async(id) => {
        await deleteProject({
          variables:{id}
        })
  }

  return (
    <div className="rounded-md w-full my-4 p-4 h-50 ">
      
      <div
        className=" rounded border-spacing-1 p-4 bg-gray-300"
        onClick={() => navigate(`/projectuser/${project._id}`)}
      >
        <h2>
          <strong>Project:</strong> {project.name}
        </h2>
        <p>
          <strong>Decripción:</strong> {project.descripcion}
        </p>
      </div>
      <button
                onClick={() => handleDeleteProject(project._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
              >
                <AiOutlineDelete/>
              </button>

    

    </div>
  );
}

export default ProjectCardUser;
