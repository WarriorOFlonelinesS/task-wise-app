export interface Task {
  id: string;
  foreignId: string | null;
  title: string;
  description: string | null;
  status: string;
  priority: number;
  due_date: string;
  smart_score: number | null;
  timestamps: string;
}

export interface TasksState {
  tasks: Task[] | null;
  taskAnalyze: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  message: string;
}

// export interface taskAnalyzer{
//   taskAnalyze: Array<string> | null;
//   token: string | null;
//   loading: boolean;
//   error: string | null;
// }
