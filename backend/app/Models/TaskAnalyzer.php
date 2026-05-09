<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskAnalyzer extends Model
{
    use HasFactory;

    protected $table = 'ai_task_analyzers';

<<<<<<< HEAD
    protected $fillable = [  
        'task_id',
        'content',
        'is_done', 
        'priority',
        'due_date',
        'smart_score'
=======
    protected $fillable = [
        'user_id',
        'task_id',
        'content',
        'is_done',
        'priority',
        'due_date',
        'smart_score',
>>>>>>> frontend/profile
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
