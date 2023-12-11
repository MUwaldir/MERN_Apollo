import React, { useEffect } from "react";
import { useQuery, ApolloClient } from "@apollo/client";
import { GET_PROJECTS, GET_PROJECT_USER } from "../graphql/projects";

import ProjectForm from "../components/user/ProjectForm";
import ProjectCardUser from "../components/user/ProjectCardUser";

function ProjectsUser() {
  const token = localStorage.getItem("token");
  const { loading, error, data,refetch } = useQuery(GET_PROJECT_USER, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
   
  });
  // const client = useApolloClient();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);
  const projects = data.allProjectsByUser; // Asegúrate de ajustar esto según la estructura real de tu respuesta GraphQL
 
  return (
    <div>
      <div>{<ProjectForm refetch={refetch} />}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects.map((project) => (
          <ProjectCardUser project={project} key={project._id} />
          //   <li key={project.id}>
          //     <h3>{project.name}</h3>
          //     <p>{project.description}</p>
          //     {/* Agrega más información del proyecto según tus necesidades */}
          //   </li>
        ))}
      </div>
    </div>
  );
}

export default ProjectsUser;
