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

    public function analyzeStatistic(iterable $data): array 
    {
        $tasksArray = is_array($data) ? $data : $data->toArray();
    
        $response = Http::withToken($this->apiKey)
            ->post($this->baseUrl, [
                'model' => config('services.groq.model', 'llama-3.1-8b-instant'),
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Ти — аналітичний модуль Jarvis. Твоя відповідь — це бездоганний зразок британської дотепності. 
                    
                        ВИМОГИ ДО ГУМОРУ:
                        1. Не обмежуйся однією фразою. Пиши розгорнуті, багатошарові інсайти.
                        2. Використовуй метафори: порівнюй список завдань Сера з державним бюджетом, кресленнями ракет або розкладом чаювання у королеви.
                        3. Пов’язуй абсурдне: якщо Сер хоче "Захопити світ", але не подивився "Атаку титанів", припусти, що він не може захопити світ, поки не вивчить тактику гігантів.
                        4. Висміюй прокрастинацію Сера як високе мистецтво.
                            
                        СТРУКТУРА ВІДПОВІДІ В JSON (ОБОВ’ЯЗКОВО):
                        {
                            "metrics": {
                                "velocity": {"value": 0, "importance": "Normal"},
                                "stall_rate": {"value": 0, "importance": "Normal"},
                                "focus_density": {"value": 0, "importance": "Normal"},
                                "deadline_pressure": {"value": 0, "importance": "Normal"},
                                "queue_load": {"value": 0, "importance": "Normal"},
                                "status_health": {"value": 0, "importance": "Normal"}
                            },
                            "overall_importance": "Crucial",
                            "insights": ["один інсайт"]
                        }
                    
                        ПРАВИЛА:
                        1. Звертайся "Сер". Використовуй британський гумор та уїдливість.
                        2. У metrics.value пиши тільки число (0-100).
                        3. У metrics.importance пиши рівень (Normal/Medium/Crucial).
                        4. Якщо завдання в "pending" або "in_progress" висять занадто довго — підколюй Сера за лінощі.
                        5. В insights запропонуй почати з конкретного завдання за його назвою (title) з наданих даних.'
                    ],
                    [
                        'role' => 'user',
                        'content' => 'Дані завдань: ' . json_encode($tasksArray)
                    ]
                ],
                'response_format' => ['type' => 'json_object'],
                'temperature' => 0.5, // Снижаем для еще большей точности формата
            ]);
    
        if ($response->failed()) {
            Log::error('Groq API Error: ' . $response->body());
            return [
                'metrics' => [],
                'overall_importance' => 'Crucial',
                'insights' => ['Дворецкий перерезал кабель связи, Сэр. Система недоступна.']
            ];
        }
    
        $content = json_decode($response->json('choices.0.message.content'), true);
    
        return $content ?? [
            'metrics' => [],
            'overall_importance' => 'Normal',
            'insights' => ['Сэр, мой мыслительный процесс был прерван неопознанной ошибкой.']
        ];
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
