<?php
namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request, AuthService $authService)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
            ]);

            $user = $authService->createUser($validatedData);

            return response()->json([
                'user' => $user,
                'message' => 'Registration successful'
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Registration error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Invalid input or internal error',
                'message' => $e->getMessage(),
            ], 422);
        }
    }
    
    public function login(Request $request, AuthService $authService)
    {
        try {
            $result = $authService->loginUser($request);

            return response()->json([
                'user' => $result['user'],
                'token' => $result['token'],
                'message' => 'Welcome!'
            ], 200);
        } catch (\Exception $e) {
            Log::error('Login error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Invalid input or internal error',
                'message' => $e->getMessage(),
            ], 401);
        }
    }

    public function logout(Request $request, AuthService $authService)
    {
        try {
            $authService->logoutUser($request);

            return response()->json([
                'message' => "Goodbye! Your tasks will be waiting 📝"
            ], 200);
        } catch (\Exception $e) {
            Log::error('Logout error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Unauthenticated.'
            ], 401);
        }
    }
}
