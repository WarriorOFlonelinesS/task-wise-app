import { createAction } from '@reduxjs/toolkit';
import { Task } from './type';

export const getStatisticRequest = createAction<{ id: string; token: string }>(
  'tasks/getStatisticRequest',
);

export const getStatisticSuccess = createAction<Task[]>('tasks/getStatisticSuccess');

export const getStatisticFailed = createAction<string>('tasks/getStatisticFailed');
