<?php

namespace App\Services;

use Illuminate\Validation\ValidationException;

class TaskValidationService
{
    public function validateFilters(array $filters): array
    {
        $rules = [
            'title' => 'sometimes|string|max:255',
            'status' => 'sometimes|string|in:pending,in_progress,done,deferred',
            'priority' => 'sometimes|integer|min:1|max:5',
            'due_date' => 'sometimes|date',
            'smart_score' => 'sometimes|numeric|min:0|max:100',
            'project_id' => 'sometimes|integer|exists:projects,id',
        ];

        $validator = validator($filters, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    public function validateCreate(array $data): array
    {
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'sometimes|string',
            'status' => 'sometimes|string|in:pending,in_progress,done,deferred',
            'priority' => 'sometimes|integer|min:1|max:5',
            'due_date' => 'sometimes|date',
        ];

        $validator = validator($data, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    public function validateUpdate(array $data): array
    {
        $rules = [
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'status' => 'sometimes|string|in:pending,in_progress,done,deferred',
            'priority' => 'sometimes|integer|min:1|max:5',
            'due_date' => 'sometimes|date',
        ];

        $validator = validator($data, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();

    }
}
