import { createAction } from '@reduxjs/toolkit';

export const taskAnalyzeRequest = createAction<{
  id: string;
  token: string;
}>('taskAnalyzer/taskAnalyzeRequest');

export const taskAnalyzeSuccess = createAction<{
  smart_score: string;
  priority: string | null;
  content: string | null;
}>('taskAnalyzer/taskAnalyzeSuccess');

export const taskAnalyzeFailure = createAction<string>('taskAnalyzer/taskAnalyzeFailure');
