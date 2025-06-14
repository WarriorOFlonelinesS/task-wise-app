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

    
}
