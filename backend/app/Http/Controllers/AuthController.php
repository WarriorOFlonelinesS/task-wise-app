<?php
namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request, AuthService $authService)
    {
        try {
            $user = $authService->createUser($request);

            return response()->json([
                'user' => $user,
                'message' => 'Registration successful'
            ], 201);
        } catch (\Exception $e) {
            Log::error('Registration error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Invalid input or internal error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
