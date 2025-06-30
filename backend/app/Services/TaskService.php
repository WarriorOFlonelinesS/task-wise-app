<?php

namespace App\Services;
use App\Models\Task;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\AuthenticationException;
use App\DTO\TaskDTO;
use App\Services\TaskValidationService;

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
            'description' => $taskDTO->description
        ]);
 
    }

    public function showTasks()
    {   
        return Task::where('user_id', auth()->user()->id)
               ->get();
    
    }

    public function showTask(string $id)
    {   return Task::where('user_id', auth()->user()->id)
        ->where("id", $id)
        ->firstOrFail();

    }
    
    public function updateTask(TaskDTO $taskDTO, string $id)
    {   
        $task = Task::where('user_id', auth()->user()->id)
            ->where('id', $id)
            ->firstOrFail();
            
        $task->update([
            'title' => $taskDTO->title,
            'description' => $taskDTO->description
        ]);
        
        return $task;
    }

    public function deleteTask(string $id)
    {   
        return Task::where('user_id', auth()->user()->id)
        ->where('id', $id)
        ->delete();
    }

    public function filterTasks(Request $request)
    {   
        $user = auth()->user();
        
        if(!$user){
            return response()->json([
                'error' => 'Unauthorized'
            ], 401);
        }

        $query = Task::where('user_id', $user->id);
        
        
        $validatedFilters = $this->validationService->validateFilters($request->all());
        
        foreach ($validatedFilters as $key => $value) {
            if ($key === 'title') {
                $query->where('title', 'like', '%' . $value . '%');
            } else {
                $query->where($key, $value);
            }
        }
        
        return $query->get();
    }

}
