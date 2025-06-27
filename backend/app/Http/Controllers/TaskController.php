<?php
namespace App\Http\Controllers;

use App\Services\TaskService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use App\Services\TaskValidationService;
use App\DTO\TaskDTO;

class TaskController extends Controller
{
    
    public function __construct(Request $request, TaskService $taskService) {
        $this->request = $request;
        $this->taskService = $taskService;
    }

    public function index()
    {
        try {
        
        $tasks = $taskService->showTasks($request->user());
        $userName = $request->user()->name;
        return response()->json([
            'tasks' => $tasks,
            'message' => "Tasks of $userName"
        ], 200);}
        catch (\Exception $e) {
            Log::error('Error getting task: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to get tasks',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function store(TaskValidationService $validation)
    {   

        try {
         
            $validData = $validation->validate($this->request->all());
            $dto = new TaskDTO($validData);
            $task = $this->taskService->createTask($dto);

            return response()->json([
                'task' => $task,
                'message' => 'Task added!'
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error creating task: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to create task',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Request $request, taskService $taskService, string $id)
    {
        try {
            $task = $taskService->showTask($request->user(), $id);
            $userName = $request->user()->name;
            return response()->json([
                'task' => $task,
                'message' => "Task of $userName"
            ], 200);}
            catch (\Exception $e) {
                Log::error('Error geting task: ' . $e->getMessage());
                return response()->json([
                    'error' => 'Failed to get task',
                    'message' => $e->getMessage()
                ], 500);
            }
    }

    public function update(Request $request, taskService $taskService, string $id)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string'
            ]);

            $task = $taskService->createTask($request->user(), $validatedData);

            return response()->json([
                'task' => $task,
                'message' => 'Task updated!'
            ], 200);
        }
        catch (\Exception $e) {
            Log::error('Error updating task: ' . $e->getMessage());
            return response()->json([
            'error' => 'Failed to update task',
            'message' => $e->getMessage()
        ], 500);
        }
    }

    public function destroy(Request $request, taskService $taskService, string $id)
    {
        try {

            $taskService->deleteTask($request->user(), $id);

            return response()->json([
                'message' => "Task with id $id was deleted!!"
            ], 200);
        }
        catch (\Exception $e) {
            Log::error('Error deleting task: ' . $e->getMessage());
            return response()->json([
            'error' => 'Failed to delete task',
            'message' => $e->getMessage(),
        ], 500);
        }
    }

    public function filter(Request $request, taskService $taskService)
    { 
        try {
            $task = $taskService->filterTasks($request);
            return response()->json([
                'task'=> $task,
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors(),
            ], 422);
        }

    }

}