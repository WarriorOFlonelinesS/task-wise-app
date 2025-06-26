<?php

namespace App\Services;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\AuthenticationException;
use App\DTO\UserDTO;

class AuthService

{   
    public function createUser(UserDTO $dto)
    {   
        return User::create([
            'name' => $dto->name,
            'email' => $dto->email,
            'password' => Hash::make($dto->password),
        ]);
    }

    public function loginUser(UserDTO $dto){
        $user = User::where('email', $dto->email)->first();
        if(! $user || !Hash::check($dto->password, $user->password)){
            throw new AuthenticationException('Invalid credentials');
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        return ['user' => $user, 'token' => $token];
    }

    public function logoutUser(){
        try {
            $token = auth()->user()->currentAccessToken();
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
