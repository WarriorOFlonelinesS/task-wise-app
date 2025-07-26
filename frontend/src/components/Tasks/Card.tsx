import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import {
  deleteTaskRequest,
  taskAnalyzeFailure,
  taskAnalyzeRequest,
} from '../../features/tasks/tasksAction';
import { useDispatch, useSelector } from 'react-redux';
import UpdateTask from './UpdateTask';
import { updateTasksRequest } from '../../features/tasks/tasksSlice';

export default function Card({ data }) {
  const token = useSelector((state) => state.auth.token);
  const taskAnalizeArray = useSelector((state) => state.tasks.taskAnalyze);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const taskAnalizeItem = taskAnalizeArray.filter((task) => Number(task.task_id) === data.id);

  const subtasks = taskAnalizeItem[0]
  ? JSON.parse(taskAnalizeItem[0].content).subtasks
  : null;

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
    dispatch(deleteTaskRequest(id));
  };

  const taskAnalize = (id) => {
    dispatch(taskAnalyzeRequest({ id, token }));
  };

  const closeUpdateModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-white/5 border border-gray-300 rounded-lg p-4 mb-4 mx-4 shadow-md text-white">
      {isOpen ? (
        <UpdateTask onClose={closeUpdateModal} updateToDo={updateToDo} data={data} />
      ) : null}
      <h3 className="text-lg font-semibold mb-2">{data.title}</h3>
      <p className="text-sm mb-4">{data.description}</p>
      <div>
        {subtasks ? (
          <>
          <h3 className='font-bold'>Subtasks</h3>
          <ol className='list-decimal ml-3'>
            {subtasks.map((subtask: string) => {
              return <li className='text-sm'>{subtask}</li>;
            })}
          </ol>
          </>
        ) : null}
      </div>
      <div className="flex justify-end space-x-2">
        <button title="Update Task" onClick={() => setIsOpen(true)}>
          <PencilIcon className="h-5 w-5 " />
        </button>
        <button title="Delete Task" onClick={() => deleteToDo(data.id)}>
          <TrashIcon className="h-5 w-5" />
        </button>
        <button title="Analyze Task" onClick={() => taskAnalize(data.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09m8.445-7.188L18 9.75l-.259-1.035a3.38 3.38 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.38 3.38 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.38 3.38 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.38 3.38 0 0 0-2.456 2.456m-1.365 11.852L16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183l.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394l-1.183.394a2.25 2.25 0 0 0-1.423 1.423"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
