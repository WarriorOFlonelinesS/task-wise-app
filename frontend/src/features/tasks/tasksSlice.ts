import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState } from './type';
import { act } from 'react';

const initialState: TasksState = {
  tasks: null,
  token: null,
  loading: false,
  error: null,
  message: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getTasksRequest(
      state,
      action: PayloadAction<{
        token: string;
      }>,
    ) {
      state.loading = true;
      state.error = null;
    },
    getTasksSuccess(
      state,
      action: PayloadAction<{
        tasks: Task[];
      }>,
    ) {
      state.loading = false;
      state.error = null;
      state.tasks = action.payload.tasks;
    },
    getTasksFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    postTasksRequest(
      state,
      action: PayloadAction<{
        title: string;
        description: string;
      }>,
    ) {
      state.error = null;
    },
    postTasksSuccess(state, action: PayloadAction<{ task: Task }>) {

      if (state.tasks) {
        state.tasks.push(action.payload.task);
      } else {
        state.tasks = [action.payload.task];
      }
    },
    postTasksFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    deleteTasksRequest(state, action: PayloadAction<string>) {
      state.error = null;
    },
    deleteTasksSuccess(state, action: PayloadAction<string>) {

      if (state.tasks) {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      }
    },
    deleteTasksFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    updateTasksRequest(state, action: PayloadAction<{id:string, title:string, description: string}>) {
      state.error = null;
    },
    updateTasksSuccess(state, action: PayloadAction<Task>) {
      console.log(action.payload.id)
      if (state.tasks) {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if(index !== -1){
          state.tasks[index] = action.payload;
        }
      }
    },
    updateTasksFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const {
  getTasksRequest,
  getTasksSuccess,
  getTasksFailure,
  postTasksRequest,
  postTasksSuccess,
  postTasksFailure,
  deleteTasksFailure,
  deleteTasksRequest,
  deleteTasksSuccess,
  updateTasksRequest,
  updateTasksSuccess,
  updateTasksFailure,
} = tasksSlice.actions;
export default tasksSlice.reducer;
