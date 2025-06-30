<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
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

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function(){

    Route::get('/tasks/filter', [TaskController::class, 'filter']);

    Route::get('/tasks', [TaskController::class, 'index']);

    Route::get('/tasks/{id}', [TaskController::class, 'show']);

    Route::post('/tasks', [TaskController::class, 'store']);

    Route::put('/tasks/{id}', [TaskController::class, 'update']);

    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);
});