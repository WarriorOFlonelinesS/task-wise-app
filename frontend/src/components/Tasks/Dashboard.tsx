import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

import type { Task } from '../../features/tasks/type';
import Card from './Card';
import AddTask from './AddTask';
import { postTasksRequest } from '../../features/tasks/tasksSlice';
import { getTasksRequest } from '../../features/tasks/tasksAction';

export default function Dashboard() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const token = useSelector((state: RootState) => state.auth.token);
  const error = useSelector((state: RootState) => state.tasks.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listTasks, setTasks] = useState<Task[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToDo = (title, description) => {
    dispatch(
      postTasksRequest({
        title: title,
        description: description,
      }),
    );
  };

  useEffect(() => {
    if (token) {
      dispatch(getTasksRequest(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (tasks) {
      setTasks(tasks);
    } else {
      setTasks([]);
    }
  }, [tasks]);

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div className='w-full min-h-screen'>
      {error && (
        <div className="bg-red-500 text-white px-4 py-2 rounded mb-4 text-center">{error}</div>
      )}
      {isOpen ? <AddTask onClose={onClose} addToDo={addToDo} /> : null}
      <h1 className="text-3xl font-bold text-center mb-11 text-white">Task AI Manager</h1>
      <div className="max-h-[80%] w-full overflow-y-auto no-scrollbar max-w-md mx-auto">
        {listTasks.length ? (
          listTasks.map((task, index) => (
            <Card data={task} key={task.id || `task-${index}`} onClose={onClose} />
          ))
        ) : (
          <h2 className="text-center">You don't have tasks</h2>
        )}
      </div>

      <div className="flex justify-center">
        <div className="w-3/6 fixed bottom-0 left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-white/5 px-6 py-2 backdrop-blur-xs rounded-md border border-gray-300 flex items-center justify-around">
          <button
            title="Add new task"
            className="backdrop-blur-md bg-white/5 p-0.5 backdrop-blur-xs rounded-md border border-gray-300 hover:bg-gray-100 transition-colors flex items-center gap-2"
            onClick={() => setIsOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          <button
            title="Profile"
            onClick={() => {
              navigate('/profile');
            }}
            className="backdrop-blur-md bg-white/5 p-1 backdrop-blur-xs rounded-md border border-gray-300 hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <UserIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
