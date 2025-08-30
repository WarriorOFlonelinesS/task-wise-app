import {createSelector} from '@reduxjs/toolkit'

export const selectSortedTasks = createSelector(
    (state) => state.tasks.tasks,
    (state) => state.tasks.taskAnalyze,
    (tasks, taskAnalyze) => {

      
      if (!tasks || tasks.length === 0) return []
      if (!taskAnalyze || taskAnalyze.length === 0) return tasks;

      const analysisMap = new Map();
      taskAnalyze.forEach(analysis => {
        if(analysis.task_id && analysis.smart_score !== null && analysis.smart_score !== undefined){
          const taskId = String(analysis.task_id);
          analysisMap.set(taskId, analysis)
        }
      })
      
 
      const sortedTasks = [...tasks].sort((a, b) => {
        const analysisA = analysisMap.get(String(a.id));
        const analysisB = analysisMap.get(String(b.id));
        
        const scoreA = analysisA ? Number(analysisA.smart_score) : 0;
        const scoreB = analysisB ? Number(analysisB.smart_score) : 0;
    
        
        return scoreB - scoreA;
      });
      
   
      
      return sortedTasks;
    }
)