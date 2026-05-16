import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState } from './type';

const initialState: statisticState = {
  statistic: {},
  loading: false,
  error: null,
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
      state.statistic = null;
    },
    getStatisticSuccess(
      state,
      action: PayloadAction<{
        statistic: string;
      }>,
    ) {
      state.statistic = action.payload;
    },
    getStatisticFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { getStatisticRequest, getStatisticSuccess, getStatisticFailure } =
  statisticSlice.actions;
export default statisticSlice.reducer;
