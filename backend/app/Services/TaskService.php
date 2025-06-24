<?php

namespace App\Services;
use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\AuthenticationException;

class TaskService
{   
    public function createTask(User $user, array $data)
    {   
        return Task::create([
            'user_id' => $user->id,
            'title' => $data['title'],
            'description' => $data['description']
        ]);
    }

    public function showTasks(User $user)
    {   
        return Task::where('user_id', $user->id)->get();
    }
    public function showTask(User $user, $id)
    {   return Task::where('user_id', $user->id)
        ->where("id", $id)
        ->firstOrFail();
    }
    
    public function updateTask(User $user, array $data, $id)
    {   $tasks = Task::where('user_id', $user->id)->get();
        Task::find($id)->update([
            'title' => $data['title'],
            'description' => $data['description']
        ]);
        return $tasks[$id];
    }

    public function deleteTask(User $user, string $id)
    {   
        return Task::where('user_id', $user->id)
        ->where('id', $id)
        ->delete();
    }

    public function filterTasks($request)
    {   
        $user = $request->user();

        if(!$user){
            return response()->json([
                'error' => 'Unauthorized'
            ], 401);
        }

        $validated = $request->validate([
            'id'=>'sometimes|integer',
            'status'=> 'sometimes|sting',
            'user_id'=> 'sometimes:integer',
            'project_id'=>'sometimes|integer',
            'titme'=> 'sometimes|sting',
            'due_date'=> 'sometimes|dateTime',
            'smart_score'=> 'sometimes|float',
        ]);

        $query = Task::where('user_id', $user->id);

        foreach ($validated as $key => $value) {
            $query->where($key, $value);
        }
        
        return $query->get();
    }
}
