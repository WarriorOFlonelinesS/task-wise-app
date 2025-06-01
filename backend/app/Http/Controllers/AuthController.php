<?php

namespace App\Http\Controllers;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController
{
 
    public function register(Request $request, AuthService $authService)
    {
        $user = $authService->createUser($request);
        return responce()->json($user);
    }
    
}
