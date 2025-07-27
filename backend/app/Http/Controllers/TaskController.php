<?php

namespace App\Http\Controllers;

use App\DTO\TaskDTO;
use App\Services\TaskService;
use App\Services\TaskValidationService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class TaskController extends Controller
{
    protected Request $request;

    protected TaskService $taskService;

    public function __construct(Request $request, TaskService $taskService)
    {
        $this->request = $request;
        $this->taskService = $taskService;
    }

    public function index()
    {
        try {

            $tasks = $this->taskService->showTasks();

            return response()->json([
                'tasks' => $tasks,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error getting task: '.$e->getMessage());

            return response()->json([
                'error' => 'Failed to get tasks',
            ], 500);
        }
    }

    public function store(TaskValidationService $validation)
    {
        try {
            $validData = $validation->validateCreate($this->request->all());
            $dto = new TaskDTO($validData);
            $task = $this->taskService->createTask($dto);

            return response()->json([
                'task' => $task,
                'message' => 'Task added!',
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error creating task: '.$e->getMessage());

            return response()->json([
                'error' => 'Failed to create task',
            ], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $task = $this->taskService->showTask($id);
            $userName = auth()->user()->name;

            return response()->json([
                'task' => $task,
                'message' => "Task of $userName",
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Task not found',
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error getting task: '.$e->getMessage());

            return response()->json([
                'error' => 'Failed to get task',
            ], 500);
        }
    }

    public function update(TaskValidationService $validation, string $id)
    {
        try {
            $validData = $validation->validateUpdate($this->request->all());
            $dto = new TaskDTO($validData);
            $task = $this->taskService->updateTask($dto, $id);

            return response()->json([
                'task' => $task,
                'message' => 'Task updated!',
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Task not found',
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error updating task: '.$e->getMessage());

            return response()->json([
                'error' => 'Failed to update task',
            ], 500);
        }
    }

    public function destroy(string $id)
    {
        try {
            $this->taskService->deleteTask($id);

            return response()->json([
                'message' => 'Task deleted successfully',
            ], 202);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Task not found',
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error deleting task: '.$e->getMessage());

            return response()->json([
                'error' => 'Failed to delete task',
            ], 500);
        }
    }

    public function filter()
    {
        try {

            $task = $this->taskService->filterTasks($this->request);

            return response()->json([
                'task' => $task,
            ], 200);
        } catch (ValidationException $e) {
            Log::error('Error deleting task: '.$e->getMessage());

            return response()->json([
                'errors' => $e->errors(),
            ], 422);
        }

    }
}
