<?php

namespace App\DTO;

class TaskDTO
{
    public $title;

    public $description;
<<<<<<< HEAD
=======
    
    public $status;
>>>>>>> frontend/profile

    public function __construct(array $data)
    {
        $this->title = $data['title'] ?? null;
        $this->description = $data['description'] ?? null;
<<<<<<< HEAD
=======
        $this->status = $data['status'] ?? 'pending';
>>>>>>> frontend/profile
    }
}
