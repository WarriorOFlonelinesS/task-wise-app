import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { deleteTaskRequest } from '../../features/tasks/tasksAction';
import { useDispatch } from 'react-redux';
import UpdateTask from './UpdateTask';
import { updateTasksRequest } from '../../features/tasks/tasksSlice';

export default function Card({ data, onClose}) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  
  const updateToDo = (id, title, description) => {
    dispatch(
      updateTasksRequest({
        id: id,
        title: title,
        description: description,
      }),
    );
  };

  const deleteToDo = (id) => {
    console.log(id)
    dispatch(
      deleteTaskRequest(id),
    );
  };

  const closeUpdateModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-white/5 border border-gray-300 rounded-lg p-4 mb-4 mx-4 shadow-md text-white">
      {isOpen ? <UpdateTask onClose={closeUpdateModal} updateToDo={updateToDo} data={data} /> : null}
      <h3 className="text-lg font-semibold mb-2">{data.title}</h3>
      <p className="text-sm mb-4">{data.description}</p>
      <div className="flex justify-end space-x-2">
        <button title="Update Task" onClick={()=>setIsOpen(true)}>
          <PencilIcon className="h-5 w-5 " />
        </button>
        <button title="Delete Task" onClick={()=>deleteToDo(data.id)}>
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
