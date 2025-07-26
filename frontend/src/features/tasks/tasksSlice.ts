import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState } from './type';

const initialState: TasksState = {
  tasks: null,
  taskAnalyze: [],
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
    updateTasksRequest(
      state,
      action: PayloadAction<{ id: string; title: string; description: string }>,
    ) {
      state.error = null;
    },
    updateTasksSuccess(state, action: PayloadAction<Task>) {
      if (state.tasks) {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);

        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      }
    },
    updateTasksFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    taskAnalyzeRequest(
      state,
      action: PayloadAction<{
        id: string;
        token: string;
      }>,
    ) {
      state.loading = true;
      state.error = null;
    },
    taskAnalyzeSuccess(state, action: PayloadAction<{ content: string; task_id: string }>) {
      state.loading = false;
      state.error = null;
      if (state.taskAnalyze) {
        state.taskAnalyze.push(action.payload);
      } else {
        state.taskAnalyze = [action.payload];
      }
    },

    taskAnalyzeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
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
  taskAnalyzeRequest,
  taskAnalyzeSuccess,
  taskAnalyzeFailure,
} = tasksSlice.actions;
export default tasksSlice.reducer;
