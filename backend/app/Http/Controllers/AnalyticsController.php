<?php

namespace App\Http\Controllers;

use App\Services\JarvisService;
use App\Services\TaskService;
use Illuminate\Http\Request;
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
            $statistics = $this->jarvisService->analyzeStatistic($tasks);

            return response()->json([
                'statistics' => $statistics,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error getting task: '.$e->getMessage());

            return response()->json([
                'error' => 'I have gone to drink tea',
            ], 500);
        }
    }

    public function taskAnalyze(string $id)
    {
        try {
            $tasks = $tasks = $this->taskService->showTask($id);
            $analyzeTask = $this->jarvisService->analyzeTask($tasks);

            return response()->json([
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
