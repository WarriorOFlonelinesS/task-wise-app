<?php

use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GeminiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use App\Services\JarvisService;
use Illuminate\Support\Facades\Route;

Route::get('/ping', function () {
    return 'pong';
});

Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to the TaskWise API!',
        'status' => 'ok',
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Rate limited authentication routes
Route::middleware('throttle:20,1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/loginwithtoken', [AuthController::class, 'loginWithToken'])->name('loginWithToken');
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/tasks/filter', [TaskController::class, 'filter']);

    Route::get('/tasks', [TaskController::class, 'index']);

    Route::get('/tasks/{id}', [TaskController::class, 'show']);

    Route::post('/tasks', [TaskController::class, 'store']);

    Route::put('/tasks/{id}', [TaskController::class, 'update']);

    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);

    Route::get('/tasks-analytic/{id}', [AnalyticsController::class, 'taskAnalyze']);
    
    Route::get('/tasks-analytic', [AnalyticsController::class, 'tasksStatistic']);

    Route::get('/profile/{id}', [ProfileController::class, 'show']);

    Route::put('/profile/{id}', [ProfileController::class, 'update']);

    Route::delete('/profile/{id}', [ProfileController::class, 'destroy']);
});
