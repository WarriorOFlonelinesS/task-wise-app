import { createAction } from '@reduxjs/toolkit';
import { Task } from './type';

export const getTasksRequest = createAction('tasks/getTasksRequest');

export const getTasksSuccess = createAction<Task[]>('tasks/getTasksSuccess');

export const getTasksFailed = createAction<string>('tasks/getTasksFailed');

export const postTaskRequest = createAction<{ title: string; description: string }>(
  'tasks/postTasksRequest',
);

export const postTaskSuccess = createAction<Task>('tasks/postTasksRequest');

export const postTasksFailed = createAction<string>('tasks/postTasksRequest');

export const deleteTasksRequest = createAction<string>('tasks/deleteTasksRequest');

export const deleteTasksSuccess = createAction<string>('tasks/deleteTasksSuccess');

export const deleteTasksFailed = createAction<string>('tasks/deleteTasksFailed');

export const updateTasksRequest = createAction<{ id: string; title: string; description: string }>('tasks/updateTasksRequest');

export const updateTasksSuccess = createAction<Task>('tasks/updateTasksSuccess');

export const updateTasksFailed = createAction<string>('tasks/updateTasksFailed');

export const taskAnalyzeRequest = createAction<{
  id: string;
  token: string;
}>('tasks/taskAnalyzeRequest');

export const taskAnalyzeSuccess = createAction<{
  content: string | null;
}>('tasks/taskAnalyzeSuccess');

export const taskAnalyzeFailure = createAction<string>('tasks/taskAnalyzeFailure');

export const tasksSortBySmartScore = createAction<string>('tasks/tasksSortBySmartScore');
