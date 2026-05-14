import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState } from './type';

const initialState: statisticState = {
  statistic: {}
};

const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    getStatisticRequest(
      
      state,
      action: PayloadAction<{
        token: string;
      }>,
    ) {
     
      state.loading = true;
      state.error = null;
    },
    getStatisticSuccess(
      state,
      action: PayloadAction<{
        statistic: Task[];
      }>,
    ) {
      state.statistic = action.payload.statistic;

    },
    getStatisticFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
   
  },
});

export const {
  getStatisticRequest,
  getStatisticSuccess,
  getStatisticFailure,
} = statisticSlice.actions;
export default statisticSlice.reducer;
