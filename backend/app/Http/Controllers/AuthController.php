<?php

namespace App\Http\Controllers;

use App\DTO\UserDTO;
use App\Services\AuthService;
use App\Services\UserValidationService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function __construct(Request $request, AuthService $authService, UserValidationService $validation)
    {
        $this->request = $request;
        $this->authService = $authService;
        $this->validation = $validation;
    }

    public function register()
    {
        try {
            $validData = $this->validation->validateRegister($this->request->all());
            $dto = new UserDTO($validData);
            $result = $this->authService->createUser($dto);
            $user = $result['user'];
            $token = $result['token'];
            
            return response()->json([
                'user' => $user,
                'token' => $token,
                'message' => 'Registration successful',
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Registration error: '.$e->getMessage());
            return response()->json([
                'error' => 'Invalid input or internal error',
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function login()
    {
        try {
            $validData = $this->validation->validateLogin($this->request->all());
            $dto = new UserDTO($validData);
            $result = $this->authService->loginUser($dto);
            $user = $result['user'];
            $token = $result['token'];

            return response()->json([
                'user' => $user,
                'token' => $token,
                'message' => 'Welcome!',
            ], 200);
        } catch (AuthenticationException $e) {
            Log::error('Login authentication error: '.$e->getMessage());

            return response()->json([
                'error' => 'Invalid input or internal error',
            ], 401);
        } catch (\Exception $e) {
            Log::error('Login error: '.$e->getMessage());

            return response()->json([
                'error' => 'Invalid input or internal error',
                'message' => $e->getMessage(),
            ], 401);
        }
    }

    public function logout()
    {
        try {
            $this->authService->logoutUser($this->request);

            return response()->json([
                'message' => 'Goodbye! Your tasks will be waiting 📝',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Logout error: '.$e->getMessage());

            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }
    }
}
