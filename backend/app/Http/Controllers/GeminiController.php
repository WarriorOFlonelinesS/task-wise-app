<?php

namespace App\Http\Controllers;

use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class GeminiController extends Controller
{
    protected $geminiService;

    public function __construct(GeminiService $geminiService) {
        $this->geminiService = $geminiService;
    }

    public function analyzeData($id){
        try{
            $response = $this->geminiService->makeRequest($id);
            return Response::json(json_decode($response, true));
        }catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], 500);
        }
    }
}
