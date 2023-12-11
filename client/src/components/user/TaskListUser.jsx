import { useMutation } from '@apollo/client'
import React from 'react'
import { DELETE_TASK, UPDATE_TASK } from '../../graphql/projects'
import TaskCardUser from './TaskCardUser'

function TaskListUser({tasks}) {
    const [deleteTask, {loading,error,data}] = useMutation(DELETE_TASK)
      // const [updateTask, {loading,error,data}] = useMutation(UPDATE_TASK, {
      //   refetchQueries: ["GetProject"],
      // })

    const onDelete = async (id) => {
        const data = await deleteTask({variables:{id}})

        console.log(data)
    }
  
  return (
    <div className="mt-6">
    <h3 className="text-lg font-semibold mb-2">Tasks:</h3>
    {tasks.length === 0 ? (
      <p>No Hay tareas</p>
    ) : (
     <TaskCardUser tasks={tasks} onDelete={onDelete}  />
    )}
  </div>
  )
}

export default TaskListUser
