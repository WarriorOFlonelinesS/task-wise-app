export interface taskAnalyzerState {
  taskAnalyze: Array<string> | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
