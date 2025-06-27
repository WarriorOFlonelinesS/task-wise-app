<?php

namespace App\Services;

class TaskValidationService
{   
    public function validate(array $data)
    {   
        return validator($data, [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ])->validate();
    }
}
