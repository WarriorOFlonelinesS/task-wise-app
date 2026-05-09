export interface HighlighterState {
  text: Highlighter;
  message: string;
  loading: boolean;
}

export interface Highlighter {
  selection: string;
  color: string;
  sourceText: string;
  taskId: string | number | null;
}
