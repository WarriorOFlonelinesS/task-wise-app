import {createSelector} from '@reduxjs/toolkit'

export const selectSortedTasks = createSelector(
    (state) => state.tasks.tasks,
    (state) => state.tasks.taskAnalyze,
    (tasks, taskAnalyze) => {
      console.log('=== SELECTOR DEBUG ===');
      console.log('Tasks:', tasks);
      console.log('Task Analyze:', taskAnalyze);
      
      if (!tasks || tasks.length === 0) return []
      if (!taskAnalyze || taskAnalyze.length === 0) return tasks;

      // Create a map of task_id to analysis for quick lookup
      const analysisMap = new Map();
      taskAnalyze.forEach(analysis => {
        if(analysis.task_id && analysis.smart_score !== null && analysis.smart_score !== undefined){
          const taskId = String(analysis.task_id);
          analysisMap.set(taskId, analysis)
        }
      })
      
      console.log('Analysis Map:', analysisMap);
      
      // Sort all tasks by smart score, with tasks without analysis getting a default score of 0
      const sortedTasks = [...tasks].sort((a, b) => {
        const analysisA = analysisMap.get(String(a.id));
        const analysisB = analysisMap.get(String(b.id));
        
        const scoreA = analysisA ? Number(analysisA.smart_score) : 0;
        const scoreB = analysisB ? Number(analysisB.smart_score) : 0;
        
        console.log(`Comparing task ${a.id} (score: ${scoreA}) vs task ${b.id} (score: ${scoreB})`);
        
        return scoreB - scoreA; // Descending order (highest score first)
      });
      
      console.log('Sorted result:', sortedTasks);
      console.log('=== END SELECTOR DEBUG ===');
      
      return sortedTasks;
    }
)