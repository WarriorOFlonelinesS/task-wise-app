import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import type { Task } from '../../features/tasks/type';
import Card from './Card';
import AddTask from './AddTask';
import { postTasksRequest} from '../../features/tasks/tasksSlice';
import { getTasksRequest } from '../../features/tasks/tasksAction';
import {selectSortedTasks} from '../../features/tasks/selectors/selectSortedTasks'
import Magic from './Magic';

export default function Dashboard() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const token = useSelector((state: RootState) => state.auth.token);
  const error = useSelector((state: RootState) => state.tasks.error);
 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listTasks, setTasks] = useState<Task[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [load, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isSorted, setIsSorted] = useState(false);
  const sortedTasksList = useSelector(selectSortedTasks);
  const taskAnalyze = useSelector((state: any) => state.tasks.taskAnalyze);
  

  const addToDo = (title, description) => {
    setIsSorted(false);
    dispatch(
      postTasksRequest({
        title: title,
        description: description,
      }),
    );
  };

  const sortTasks = () => {

    
    if (isSorted) {
      // Reset to original order
      setTasks(tasks || []);
      setIsSorted(false);

    } else {
      // Sort by smart score
  
      setTasks(sortedTasksList);
      setIsSorted(true);

    }
    
    setIsLoaded(true);
    const timer = setTimeout(() => {
      setIsLoaded(false);
      setTimeout(() => setShowLoader(false), 1000);
    }, 5000);
    return () => clearTimeout(timer);
  };  

  useEffect(() => {
    if (token) {
      dispatch(getTasksRequest(token));
    }
    
  }, [dispatch, token]);

  useEffect(() => {
    if (tasks && !load && !isSorted) {
      setTasks(tasks);
    } else if (!tasks) {
      setTasks([]);
    }
  }, [tasks, load, isSorted]);

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="w-full min-h-screen">
      {error && (
        <div className="bg-red-500 text-white px-4 py-2 rounded mb-4 text-center">{error}</div>
      )}
      {isOpen ? <AddTask onClose={onClose} addToDo={addToDo} /> : null}
      <h1 className="text-3xl font-bold text-center mb-11 text-white">Task AI Manager</h1>
      <div className="max-h-[80%] w-full overflow-y-auto no-scrollbar max-w-md mx-auto">
        {load ? <Magic
          className={`fixed inset-0 flex items-center justify-center transition-opacity duration-1000 z-50
            ${load ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          `}
        /> : (listTasks.length ? (
          listTasks.map((task, index) => (
            <Card data={task} key={task.id || `task-${index}`} />
          ))
        ) : (
          <h2 className="text-center">You don't have tasks</h2>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="w-3/4 fixed bottom-0 left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-white/5 px-6 py-2 backdrop-blur-xs rounded-md border border-gray-300 flex items-center justify-around">
          <button
            title="Add new task"
            className="backdrop-blur-md bg-white/5 p-0.5 backdrop-blur-xs rounded-md border border-gray-300 hover:bg-gray-100 transition-colors flex items-center w-9 h-9"
            onClick={() => setIsOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-9"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          <button
            title={isSorted ? "Reset to original order" : "Sort tasks by smart score"}
            className="backdrop-blur-md bg-white/5 p-0.5 backdrop-blur-xs rounded-md border border-gray-300 hover:bg-gray-100 transition-colors flex items-center w-9 h-9"
            onClick={sortTasks}
          >
            <svg fill="#ffffff" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 490 490" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <polygon points="85.877,154.014 85.877,428.309 131.706,428.309 131.706,154.014 180.497,221.213 217.584,194.27 108.792,44.46 0,194.27 37.087,221.213 "></polygon> <polygon points="404.13,335.988 404.13,61.691 358.301,61.691 358.301,335.99 309.503,268.787 272.416,295.73 381.216,445.54 490,295.715 452.913,268.802 "></polygon> </g> </g></svg>
          </button>
          <button
            title="Profile"
            onClick={() => {
              navigate('/profile');
            }}
            className="backdrop-blur-md bg-white/5 p-1 backdrop-blur-xs rounded-md border border-gray-300 hover:bg-gray-100 transition-colors flex items-center gap-2 w-9 h-9"
          >
            <UserIcon className="h-9 w-9" />
          </button>
        </div>
      </div>
    </div>
  );
}
