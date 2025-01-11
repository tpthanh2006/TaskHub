import React from 'react'
import { FaEdit, FaCheckDouble, FaRegTrashAlt  } from 'react-icons/fa'

const Task = () => {
  return (
    <div className="task">
      <p>
        <b>1. </b>
        Task 1
      </p>

      <div className="task__icons">
        <FaCheckDouble color="green" />
        <FaEdit color="purple" />
        <FaRegTrashAlt color="red" />
      </div>
    </div>
  )
}

export default Task