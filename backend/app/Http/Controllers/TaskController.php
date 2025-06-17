<?php
namespace App\Http\Controllers;

use App\Services\TaskService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class TaskController extends Controller
{
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, taskService $taskService)
    {
        try {$tasks = $taskService->showTasks($request->user());
        $userName = $request->user()->name;
        return response()->json([
            'tasks' => $tasks,
            'message' => "Tasks of $userName"
        ], 200);}
        catch (\Exception $e) {
            Log::error('Error  getting task: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to get tasks',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, TaskService $taskService)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string'
            ]);

            $task = $taskService->createTask($request->user(), $validatedData);

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

//     /**
//      * Display the specified resource.
//      */
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
                Log::error('Error getting task: ' . $e->getMessage());
                return response()->json([
                    'error' => 'Failed to get task',
                    'message' => $e->getMessage()
                ], 500);
            }
    }

//     /**
//      * Update the specified resource in storage.
//      */
//     public function update(Request $request, string $id)
//     {
//         try {
    $task = $taskService->showTask($request->user(), $id);
    $userName = $request->user()->name;
    return response()->json([
        'task' => $task,
        'message' => "Task of $userName"
    ], 200);}
    catch (\Exception $e) {
        Log::error('Error getting task: ' . $e->getMessage());
        return response()->json([
            'error' => 'Failed to get task',
            'message' => $e->getMessage()
        ], 500);
    }
//     }

//     /**
//      * Remove the specified resource from storage.
//      */
//     public function destroy(string $id)
//     {
//         //
//     }

//     public function filter(string $id)
//     {
//         //
//     }
}
