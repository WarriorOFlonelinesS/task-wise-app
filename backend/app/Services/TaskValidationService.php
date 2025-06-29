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

    public function FilterValidate(array $data)
    {
        return validator($data, [
            'id'=>'sometimes|integer',
            'status'=> 'sometimes|sting',
            'user_id'=> 'sometimes:integer',
            'project_id'=>'sometimes|integer',
            'titme'=> 'sometimes|sting',
            'due_date'=> 'sometimes|dateTime',
            'smart_score'=> 'sometimes|float',
        ])->validate();
    }
}
