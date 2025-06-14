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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function filter(string $id)
    {
        //
    }
}
