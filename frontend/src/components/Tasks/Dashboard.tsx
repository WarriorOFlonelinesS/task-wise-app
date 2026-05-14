import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import type { Task } from '../../features/tasks/type';
import Card from './Card';
import AddTask from './AddTask';
import { postTasksRequest } from '../../features/tasks/tasksSlice';
import { getTasksRequest } from '../../features/tasks/tasksAction';
import { selectSortedTasks } from '../../features/tasks/selectors/selectSortedTasks';
import Magic from './Magic';
import { Plus, SortAscIcon, SortDescIcon, UserRound } from 'lucide-react';
import Button from '../Common/Button';


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
  const buttonStyles =
    ' backdrop-blur-md bg-white/5 px-3 py-1 backdrop-blur-xs rounded-md border duration-500 ease-in-out border-gray-500/70 hover:bg-[#00d1ff] hover:text-black hover:shadow-[0_0_25px_rgba(0,209,255,0.4)]  transition-colors';
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
      setTasks(tasks || []);
      setIsSorted(false);
    } else {
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
    <div className="w-full min-h-screen ">
      {error && (
        <div className="bg-red-500 text-white px-4 py-2 rounded mb-4 text-center">{error}</div>
      )}
      {isOpen ? <AddTask onClose={onClose} addToDo={addToDo} /> : null}
      <h1 className="text-3xl font-bold text-center mb-11 text-white">Dashboard</h1>
      <div className="max-h-[80%] w-full overflow-y-auto no-scrollbar max-w-md mx-auto">
        {load ? (
          <Magic
            className={`fixed inset-0 flex items-center justify-center transition-opacity duration-1000 z-50
            ${load ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          `}
          />
        ) : listTasks.length ? (
          listTasks.map((task, index) => <Card data={task} key={task.id || `task-${index}`} />)
        ) : (
          <h2 className="text-center">You don't have tasks</h2>
        )}
      </div>

      <div className="flex justify-center">
        <div className="w-3/4 fixed bottom-0 left-1/2 transform -translate-x-1/2 backdrop-blur-md  px-6 py-2 backdrop-blur-xs rounded-md shadow-md border border-gray-500/70 flex items-center justify-around">
          <Button
            onClick={() => setIsOpen(true)}
            icon={<Plus className="h-9 w-9" />}
            styles={buttonStyles}
          />
          <Button
            onClick={sortTasks}
            icon={<SortDescIcon className="h-9 w-9" />}
            styles={buttonStyles}
          />
          <Button
            label={''}
            icon={<UserRound className="h-9 w-9" />}
            styles={buttonStyles}
            to="/profile"
          />
        </div>
      </div>
    </div>
  );
}
