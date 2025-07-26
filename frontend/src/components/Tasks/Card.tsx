import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { deleteTaskRequest } from '../../features/tasks/tasksAction';
import { useDispatch, useSelector } from 'react-redux';
import UpdateTask from './UpdateTask';
import { updateTasksRequest } from '../../features/tasks/tasksSlice';
import { taskAnalyzeRequest } from '../../features/taskAnalyzer/taskAnalyzerSlice';

export default function Card({ data }) {
  const token = useSelector((state) => state.auth.token);
  const content = JSON.parse(useSelector((state) => state.taskAnalyzer.taskAnalyze));
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
        {content ? (
          <ol>
            {content.subtasks.map((subtask: string) => {
              return (
                <li>{subtask}</li>
            );
            })}
          </ol>
        ) : null}
      </div>
      <div className="flex justify-end space-x-2">
        <button title="Update Task" onClick={() => setIsOpen(true)}>
          <PencilIcon className="h-5 w-5 " />
        </button>
        <button title="Delete Task" onClick={() => deleteToDo(data.id)}>
          <TrashIcon className="h-5 w-5" />
        </button>
        <button title="Delete Task" onClick={() => taskAnalize(data.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
