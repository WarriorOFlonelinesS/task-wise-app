<?php

namespace App\DTO;

class TaskDTO
{
    public $title;

    public $description;
    
    public $status;

    public function __construct(array $data)
    {
        $this->title = $data['title'] ?? null;
        $this->description = $data['description'] ?? null;
        $this->status = $data['status'] ?? 'pending';
    }
}
