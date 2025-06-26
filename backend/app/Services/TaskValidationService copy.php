<?php

namespace App\Services;

class TaskService
{   
    public function validate(array $data)
    {   
        return validator($data, [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ])->validate();
    }
}
