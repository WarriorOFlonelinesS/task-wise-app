import { createAction } from '@reduxjs/toolkit';
import { Highlighter } from './type';

export const getHighlightRequest = createAction('highlighter/getHighlightRequest');

export const getHighlightSuccess = createAction<Highlighter[]>('highlighter/getHighlightSuccess');

export const getHighlightFailed = createAction<string>('highlighter/getHighlightFailed');

export const postHighlightRequest = createAction<{
  selection: '';
  color: '';
  sourceText: '';
  taskId: '';
}>('highlighter/postHighlightRequest');

export const postHighlightSuccess = createAction<Highlighter>('highlighter/postTasksRequest');

export const postHighlightFailed = createAction<string>('highlighter/postHighlightFailed');

export const deleteHighlightRequest = createAction<string>('highlighter/deleteHighlightRequest');

export const deleteHighlightSuccess = createAction<string>('highlighter/deleteHightlightSuccess');

export const deleteHighlightFailed = createAction<string>('highlighter/deleteHightlightFailed');
