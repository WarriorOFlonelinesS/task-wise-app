import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { taskAnalyzerState } from './type';

const initialState: taskAnalyzerState = {
  taskAnalyze: null,
  token: null,
  loading: false,
  error: null,
};

const taskAnalyzerSlice = createSlice({
  name: 'taskAnalyzer',
  initialState,
  reducers: {
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
    taskAnalyzeSuccess(
      state,
      action: PayloadAction<{ content: string; task_id:string}>,
    ) {

      state.loading = false;
      state.error = null;
      console.log(action.payload)
      if(state.taskAnalyze){
        // const index = state.content.fi
      }
    },

    taskAnalyzeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { taskAnalyzeRequest, taskAnalyzeSuccess, taskAnalyzeFailure } =
  taskAnalyzerSlice.actions;
export default taskAnalyzerSlice.reducer;
