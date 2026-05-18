<?php

namespace App\Http\Controllers;

use App\Services\JarvisService;
use App\Services\TaskService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log as FacadesLog;
use Log;

class AnalyticsController
{
    protected Request $request;

    protected TaskService $taskService;

    protected JarvisService $jarvisService;

    public function __construct(Request $request, TaskService $taskService, JarvisService $jarvisService)
    {
        $this->request = $request;
        $this->taskService = $taskService;
        $this->jarvisService = $jarvisService;

    }

    public function tasksStatistic()
    {
        try {
            $tasks = $tasks = $this->taskService->showTasks();
            Log::build([
                'driver' => 'single',
                'path' => storage_path('logs/ai_analysis.log'),
              ])->debug($tasks->toArray());
            $statistics = $this->jarvisService->analyzeStatistic($tasks->toArray());
            Log::channel('ai')->info('Анализ завершен успешно');

            return response()->json([
                'statistics' => $statistics,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error getting task: '.$e->getMessage());

            return response()->json([
                'error' => 'I have gone to drink tea for many times',
            ], 500);
        }
    }

    public function taskAnalyze(string $id)
    {
        try {
            $tasks = $tasks = $this->taskService->showTask($id);
            $analyzeTask = $this->jarvisService->analyzeTask($tasks);

            return response()->json([
                'task_id' => $id,
                'analyzeTask' => $analyzeTask,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error getting task: '.$e->getMessage());

            return response()->json([
                'error' => 'I have gone to drink tea',
            ], 500);
        }
    }
}
