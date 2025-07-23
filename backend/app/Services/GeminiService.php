<?php

namespace App\Services;

use App\DTO\TaskDTO;
use App\Models\Task;
use App\Models\TaskAnalyzer;

class GeminiService
{
    protected $client;
    protected $apiKey;
    public function __construct()
    {  
        $this->apiKey = config('services.gemini.api_key');
        $this->client = \Gemini::client($this->apiKey);
    }
   
     public function makeRequest(string $id){
        $task = Task::where('user_id', auth()->user()->id)
        ->where('id', $id)
        ->firstOrFail();

        $rawResponse = $this->client->generativeModel(model: 'gemini-2.0-flash')->generateContent("Write subtasks for ($task->title) with description:($task->description)");
        $content= $rawResponse->candidates[0]->content->parts[0]->text;
        
        $taskAnalyze = TaskAnalyzer::create(
            [
                'task_id' => $id,
                'content' => $content,
            ]
            );

        return json_encode($taskAnalyze, true);
     }
}
