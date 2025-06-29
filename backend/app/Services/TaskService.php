<?php

namespace App\Services;
use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\AuthenticationException;
use App\DTO\TaskDTO;

class TaskService
{    
    // protected $userId;

    // public function __construct()
    // {
    //     $this->userId = auth();
    // }


    // public function createTask(TaskDTO $taskDTO)
    // {   
      
    //     return Task::create([
    //         'user_id' => $userId,
    //         'title' => $taskDTO->title,
    //         'description' => $taskDTO->description
    //     ]);
    // }

    public function showTasks(User $user)
    {   
        // return Task::where('user_id', $userId)->get();
        return $user;
    }

    // public function showTask($id)
    // {   return Task::where('user_id', $userId)
    //     ->where("id", $id)
    //     ->firstOrFail();
    // }
    
    // public function updateTask(TaskDTO $taskDTO, string $id)
    // {   $tasks = Task::where('user_id', $userId)->get();
    //     Task::find($id)->update([
    //         'title' => $taskDTO->title,
    //         'description' => $taskDTO->title
    //     ]);
    //     return $tasks[$id];
    // }

    // public function deleteTask(User $user, string $id)
    // {   
    //     return Task::where('user_id', $user->id)
    //     ->where('id', $id)
    //     ->delete();
    // }

    // public function filterTasks($request)
    // {   
    //     $user = auth()->user();
        
    //     if(!$user){
    //         return response()->json([
    //             'error' => 'Unauthorized'
    //         ], 401);
    //     }

    //     $query = Task::where('user_id', $userId);

    //     foreach ($validated as $key => $value) {
    //         $query->where($key, $value);
    //     }
        
    //     return $query->get();
    // }
}
