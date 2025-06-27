<?php
namespace App\DTO;

class TaskDTO
{
    public $title;
    public $description;

    public function __construct(array $data) {
        $this->title = $data['title'] ?? null;
        $this->description = $data['description'] ?? null;
    }
    
}