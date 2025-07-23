<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskAnalyzer extends Model
{
    use HasFactory;

    protected $table = 'ai_task_analyzers';

    protected $fillable = [  
        'task_id',
        'content',
        'is_done', 
        'priority',
        'due_date',
        'smart_score'
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
