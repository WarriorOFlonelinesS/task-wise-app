<?php 

namespace App\Services;
require_once app_path('Helpers/extractScorePriorityAndSubtasks.php');

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

        $rawResponse = $this->client->generativeModel(model: 'gemini-2.0-flash')->generateContent("Given the following task, analyze and return ONLY the following fields in this exact format:

Priority: [High|Medium|Low]
Smart Score: [an integer from 0 to 100]
Subtasks:
1. [First subtask]
2. [Second subtask]
3. [Third subtask]
...

Task: {$task->title}
Description: {$task->description}

Do not include any explanation or extra text. Only output the fields above, each on its own line, exactly as shown.");
        $content= $rawResponse->candidates[0]->content->parts[0]->text;

        $priority = extractScorePriorityAndSubtasks($content)['priority'];
        $smart_score = extractScorePriorityAndSubtasks($content)['smart_score'];
        $subtasks = extractScorePriorityAndSubtasks($content);
        
        $taskAnalyze = TaskAnalyzer::create(
            [
                'task_id' => $id,
                'content' => json_encode($subtasks),
                'priority' => $priority,
                'smart_score' =>$smart_score
            ]
            );

        return json_encode($taskAnalyze, true);
     }
}
