import React from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../graphql/projects';

function DetailProject() {
  const token = localStorage.getItem('token');
  const {id} = useParams()

  const {loading,error,data} = useQuery(GET_PROJECT, {variables:{id}})
  if(loading) return <p className='flex justify-center align-middle'>loading</p>
  if(error) return <p>console.error();</p>
  console.log(data)
  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      
      <h1 className='text-center text-lg text-indigo-600'>PROJECT</h1>
      <h2 className="text-2xl font-bold mb-4 text-center"> {data.project.name}</h2>
      <p className="text-gray-600">Descripción: {data.project.descripcion}</p>
     
      <TaskList tasks={data.project.tasks}/>

    </div>
  )
}

export default DetailProject;
