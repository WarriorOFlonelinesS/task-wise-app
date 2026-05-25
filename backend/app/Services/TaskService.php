<?php

namespace App\Services;

use App\DTO\TaskDTO;
use App\Models\Task;
use Illuminate\Http\Request;

use function Illuminate\Log\log;

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
            'status' => $taskDTO->status,
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
            'status' => $taskDTO->status,
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

}
