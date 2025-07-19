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

export const deleteTaskRequest = createAction<{ id: string }>('tasks/deleteTasksRequest');

export const deleteTaskSuccess = createAction<string>('tasks/deleteTasksRequest');

export const deleteTasksFailed = createAction<string>('tasks/deleteTasksRequest');

export const updateTaskRequest = createAction<{ id: string }>('tasks/deleteTasksRequest');

export const updateTaskSuccess = createAction<string>('tasks/deleteTasksRequest');

export const updateTasksFailed = createAction<string>('tasks/deleteTasksRequest');
