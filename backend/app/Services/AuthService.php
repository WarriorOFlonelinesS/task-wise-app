<?php

namespace App\Services;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\AuthenticationException;

class AuthService
{   
    public function createUser(array $data)
    {   
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    public function loginUser($data){
        $user = User::where('email', $data->email)->first();
        if(! $user || !Hash::check($data->password, $user->password)){
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        return ['user' => $user, 'token' => $token];
    }

    public function logoutUser($data){
        try {
            $token = $data->user()->currentAccessToken();
            if (!$token) {
                throw new \Illuminate\Auth\AuthenticationException('No active token found');
            }
            
            $token->delete();
            return true;
        } catch (\Exception $e) {
            if ($e instanceof \Illuminate\Auth\AuthenticationException) {
                throw $e;
            }
            throw new \Illuminate\Auth\AuthenticationException('Failed to logout');
        }
    }
}
