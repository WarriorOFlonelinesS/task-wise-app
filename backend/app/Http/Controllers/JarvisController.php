<?php

namespace App\Http\Controllers;

use App\Services\JarvisService;
use Illuminate\Support\Facades\Response;

class GroqController extends Controller
{
    protected $jarvisService;

    public function __construct(JarvisService $jarvisService)
    {
        $this->jarvisService = $jarvisService;
    }

    public function analyzeTask(array $data)
    {
        try {
            $response = $this->jarvisService->analyzeStatistic($data);
            return Response::json($response);
        } catch (\Exception $e) {
            return Response::json(['error' =>'Я ушел на чай, поэтому ' . $e->getMessage()], 500);
        }
    }

    public function analyzeStatistic(array $task)
    {
        try {
            $response = $this->jarvisService->analyzeTask($task);
            return Response::json($response);
        } catch (\Exception $e) {
            return Response::json(['error' =>'Я ушел на чай, поэтому ' . $e->getMessage()], 500);
        }
    }
}
