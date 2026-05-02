import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { RefreshCw, CircleCheckBig } from 'lucide-react';
import React, { useState } from 'react';
import {
  deleteTasksRequest,
  taskAnalyzeRequest,
  updateTasksRequest,
} from '../../features/tasks/tasksAction';
import { useDispatch, useSelector } from 'react-redux';
import UpdateTask from './UpdateTask';
import ContextMenuApp from '../Tasks/ContextMenu';
import { HiglihterContainer } from './Highliter/HighlighterContainer';

export default function Card({ data }) {
  const priorityClasses = {
    High: 'text-red-400',
    Medium: 'text-yellow-400',
    Low: 'text-green-400',
  };

  const token = useSelector((state: any) => state.auth.token);
  const taskAnalizeArray = useSelector((state: any) => state.tasks.taskAnalyze);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const taskAnalizeItem = taskAnalizeArray.filter(
    (task) => String(task.task_id) === String(data.id),
  );
  const s = (data.status ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
  const isDone = s === 'done' || s === 'completed';
  const isInProgress = s === 'in progress' || s === 'in_progress';
  const showBeam = isInProgress;
  const showDoneIcon = isDone;
  const subtasks = taskAnalizeItem[0] ? JSON.parse(taskAnalizeItem[0].content).subtasks : null;
  const priority = taskAnalizeItem[0] ? taskAnalizeItem[0].priority : null;
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selections, setSelections] = useState<string[]>([]);
  const addSelection = (selectedText: string) => {
    const value = selectedText.trim();
    if (!value) return;

    setSelections((prev) =>
      prev.some((s) => s.toLocaleLowerCase() === value.toLowerCase()) ? prev : [...prev, value],
    );
  };

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
    dispatch(deleteTasksRequest(id));
  };

  const taskAnalize = (id) => {
    setIsAnalyzing(true);
    dispatch(taskAnalyzeRequest({ id, token }));

    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const closeUpdateModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`mb-4 mx-4 rounded-xl ${
        showBeam ? 'wrapper' : 'border border-gray-500/70'
      }`}
    >
      <div className="rounded-xl bg-white/5 p-4 text-white shadow-md">
          {isOpen ? (
            <UpdateTask onClose={closeUpdateModal} updateToDo={updateToDo} data={data} />
          ) : null}
          <h3 className="text-lg font-semibold mb-2">
            <ContextMenuApp onHighlight={addSelection}>
              <HiglihterContainer text={data.title} selection={selections} color="#FFD700" />
            </ContextMenuApp>
          </h3>

          <div className="text-sm mb-4">
            <ContextMenuApp onHighlight={addSelection}>
              <HiglihterContainer text={data.description} selection={selections} color="#FFD700" />
            </ContextMenuApp>
          </div>
          <div className="animate-slideDown">
            {subtasks ? (
              <>
                <h3 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09" />
                  </svg>
                  Subtasks
                </h3>
                <ol className="list-decimal ml-3 space-y-1">
                  {subtasks.map((subtask: string, index: number) => {
                    return (
                      <li
                        key={index}
                        className="text-sm subtask-item hover:bg-white/5 p-1 rounded transition-all duration-200"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <ContextMenuApp onHighlight={addSelection}>
                          <HiglihterContainer
                            text={subtask}
                            selection={selections}
                            color="#FFD700"
                          />
                        </ContextMenuApp>
                      </li>
                    );
                  })}
                </ol>
              </>
            ) : null}
          </div>
          <div className="flex justify-between mt-2 items-center">
            <div className="flex items-center gap-3">
              {showBeam ? (
                <RefreshCw className="h-4 w-4 animate-slow-spin text-[#00d1ff] opacity-70 drop-shadow-[0_0_8px_rgba(0,209,255,0.8)]" />
              ) : null}
              {showDoneIcon ? (
                <CircleCheckBig className="h-4 w-4 text-[#00ff9f] drop-shadow-[0_0_10px_rgba(0,255,159,0.85)]" />
              ) : null}
              {priority ? <p className={`${priorityClasses[priority]}`}>{priority}</p> : null}
            </div>
            <div className="flex justify-end space-x-2'">
              <button
                title="Update Task"
                onClick={() => setIsOpen(true)}
                className="hover:scale-110 mr-3"
              >
                <PencilIcon className="h-5 w-5 " />
              </button>
              <button
                title="Delete Task"
                onClick={() => deleteToDo(data.id)}
                className="hover:scale-110 mr-3"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
              <button
                title="Analyze Task"
                onClick={() => taskAnalize(data.id)}
                className={`transition-all duration-200 ${isAnalyzing ? 'animate-pulse-slow' : 'hover:scale-110'} `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className={isAnalyzing ? 'animate-spin' : ''}
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09m8.445-7.188L18 9.75l-.259-1.035a3.38 3.38 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.38 3.38 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.38 3.38 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.38 3.38 0 0 0-2.456 2.456m-1.365 11.852L16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183l.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394l-1.183.394a2.25 2.25 0 0 0-1.423 1.423"
                  />
                </svg>
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}
