import React, { useEffect } from 'react'
import  {useQuery} from '@apollo/client'
import { GET_PROJECTS } from '../graphql/projects'
import ProjectCard from './ProjectCard'
function ProjectList() {
    const {loading,error,data} = useQuery(GET_PROJECTS)
   if(loading) return <p>loading</p>
   if(error) return <p>console.error();</p>
console.log(data)
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
        {
            data.allProjects.map(project => (
                <ProjectCard project={project} key={project._id}/>
            ))
        }
      
    </div>
  )
}

export default ProjectList
