import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HighlighterState } from './type';

const initialState: HighlighterState = {
  text: {
    selection: '',
    color: '',
    sourceText: '',
    taskId: '',
  },
  loading: false,
  message: '',
};

const highlightSlice = createSlice({
  name: 'highlighter',
  initialState,
  reducers: {
    setHighlight(
      state,
      action: PayloadAction<{
        selection: string;
        color?: string;
        sourceText?: string;
        taskId?: string | number | null;
      }>,
    ) {
      state.text.selection = action.payload.selection;
      if (action.payload.color !== undefined) {
        state.text.color = action.payload.color;
      }
      if (action.payload.sourceText !== undefined) {
        state.text.sourceText = action.payload.sourceText;
      }
      if (action.payload.taskId !== undefined) {
        state.text.taskId = action.payload.taskId;
      }
    },
    setColor(state, action: PayloadAction<string>) {
      state.text.color = action.payload;
    },
    setSourceText(state, action: PayloadAction<string>) {
      state.text.sourceText = action.payload;
    },
    clearHighlight(state) {
      state.text.selection = '';
      state.text.taskId = null;
    },
    getHighlightRequest(
      state,
      action: PayloadAction<{
        token: string;
      }>,
    ) {
      state.loading = true;
    },
    getHighlightSuccess(
      state,
      action: PayloadAction<{
        token: string;
      }>,
    ) {
      state.text = action.payload;
      state.loading = false;
    },
    getHighlightFailure(state, action: PayloadAction<any>) {
      state.message = action.payload;
    },
    postHighlightRequest(
      state,
      action: PayloadAction<{
        selection: string;
        color?: string;
        sourceText?: string;
        taskId?: string | number | null;
      }>,
    ) {
      state.loading = true;
    },
    postHighlightSuccess(state, action: PayloadAction) {
      state.loading = false;
    },
    postHighlightFailure(state, action: PayloadAction<any>) {
      state.message = action.payload;
    },
    deleteTasksRequest(state, action: PayloadAction<string>) {
      state.message = '';
    },
    deleteHighlightSuccess(state, action: PayloadAction) {
      state.text.selection = '';
      state.loading = false;
    },
    deleteHighlightFailure(state, action: PayloadAction<any>) {
      state.message = action.payload;
    },
  },
});

export const {
  setHighlight,
  setColor,
  setSourceText,
  clearHighlight,
  getHighlightRequest,
  getHighlightSuccess,
  getHighlightFailure,
  postHighlightRequest,
  postHighlightFailure,
  postHighlightSuccess,
} = highlightSlice.actions;

export default highlightSlice.reducer;
