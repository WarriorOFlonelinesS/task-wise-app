<?php

namespace App\Services;

use Http as GlobalHttp;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class JarvisService
{
    protected string $apiKey;
    protected string $baseUrl = 'https://api.groq.com/openai/v1/chat/completions';

    public function __construct()
    {
        $this->apiKey = config('services.groq.key');
    }

    public function analyzeStatistic(array $data): array 
    {
        $response = Http::withToken($this->apiKey)
            ->post($this->baseUrl, [
                'model' => config('services.groq.model', 'llama-3.3-70b-versatile'),
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Ты — аналитический модуль Jarvis. Твоя задача — выдавать ироничные инсайты с оттенком британского юмора. Обращайся "Сэр". Верни JSON с ключами metrics, importance (Normal, Medium, Crucial) и insights.Если пользователь начинает лениться, подколи его, но предложи решение.'
                    ],
                    [
                        'role' => 'user',
                        'content' => json_encode($data)
                    ]
                    ],
                'response_format' => ['type' => 'json_object'],
                'temperature' => 0.7,
            ]);
            if ($response->failed()) {
                Log::error('Groq API Error: ' . $response->body());
                return ['error' => 'Система дала сбой, Сэр.'];
            }
            
            return json_decode($response->json('choices.0.message.content'), true);
        }

        public function analyzeTask($task): array 
        {
            $response = Http::withToken(config('services.groq.key'))
                ->post('https://api.groq.com/openai/v1/chat/completions', [
                    'model' => config('services.groq.model', 'llama-3.3-70b-versatile'),
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => "Ты — аналитический модуль Jarvis. Разбей задачу на подзадачи. 
                                        Верни ТОЛЬКО JSON с ключами: 'priority' (High, Medium, Low), 
                                        'smart_score' (0-100), 'subtasks' (массив строк)."
                        ],
                        [
                            'role' => 'user',
                            'content' => "Task: {$task->title}. Description: {$task->description}"
                        ]
                    ],
                    'response_format' => ['type' => 'json_object'],
                    'temperature' => 0.2, 
                ]);
            if ($response->failed()) {
                \Log::error('Groq Analysis Failed: ' . $response->body());
                return [
                    'priority' => 'Medium',
                    'smart_score' => 0,
                    'subtasks' => ['Сэр, модуль Groq временно недоступен.'],
                    'error' => true
                ];
            }

            $result = json_decode($response->json('choices.0.message.content'), true);

            return [
                'priority' => $result['priority'] ?? 'Medium',
                'smart_score' => $result['smart_score'] ?? 0,
                'subtasks' => $result['subtasks'] ?? [],
                'status' => 'success'
            ];
        }
        
}
