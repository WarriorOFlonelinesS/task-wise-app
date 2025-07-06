<?php

namespace App\Services;

use App\DTO\TaskDTO;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TaskService
{
    protected TaskValidationService $validationService;

    public function __construct(TaskValidationService $validationService)
    {
        $this->validationService = $validationService;
    }

    public function createTask(TaskDTO $taskDTO)
    {

        return Task::create([
            'user_id' => auth()->user()->id,
            'title' => $taskDTO->title,
            'description' => $taskDTO->description,
        ]);

    }

    public function showTasks()
    {
        return Task::where('user_id', auth()->user()->id)
            ->get();

    }

    public function showTask(string $id)
    {
        return Task::where('user_id', auth()->user()->id)
            ->where('id', $id)
            ->firstOrFail();

    }

    public function updateTask(TaskDTO $taskDTO, string $id)
    {
        $task = Task::where('user_id', auth()->user()->id)
            ->where('id', $id)
            ->firstOrFail();

        $task->update([
            'title' => $taskDTO->title,
            'description' => $taskDTO->description,
        ]);

        return $task;
    }

    public function deleteTask(string $id)
    {
        $task = Task::where('user_id', auth()->user()->id)
            ->where('id', $id)
            ->firstOrFail();
        $task->delete();
    }

    public function filterTasks(Request $request)
    {
        $user = auth()->user();

        if (! $user) {
            return response()->json([
                'error' => 'Unauthorized',
            ], 401);
        }

        $query = Task::where('user_id', $user->id);

        $validatedFilters = $this->validationService->validateFilters($request->all());

        foreach ($validatedFilters as $key => $value) {
            if ($key === 'title') {
                $query->where('title', 'like', '%'.$value.'%');
            } else {
                $query->where($key, $value);
            }
        }

        return $query->get();
    }

    public function update(Request $request, $id)
    {
        try {
            $validData = $this->validationService->validateUpdate($request->all());
            $task = Task::findOrFail($id);
            $task->update($validData);

            return response()->json($task, 200);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error updating task: '.$e->getMessage());

            return response()->json([
                'error' => 'Internal server error',
            ], 500);
        }
    }
}
