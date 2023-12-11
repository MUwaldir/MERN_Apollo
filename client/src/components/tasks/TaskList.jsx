import React from 'react'
import TaskCard from './TaskCard'
import { useMutation } from '@apollo/client'
import { DELETE_TASK } from '../../graphql/projects'

function TaskList({tasks}) {
    const [deleteTask, {loading,error,data}] = useMutation(DELETE_TASK, {
        refetchQueries: ["GetProject"],
      })

    const onDelete = async (id) => {
        const data = await deleteTask({variables:{id}})

        console.log(data)
    }
    const onUpdate = (id) => {

    }
  return (
    <div className="mt-6">
    <h3 className="text-lg font-semibold mb-2">Tasks:</h3>
    {tasks.length === 0 ? (
      <p>No Hay tareas</p>
    ) : (
     <TaskCard tasks={tasks} />
    )}
  </div>
  )
}

export default TaskList
