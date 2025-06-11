<?php

namespace App\Services;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

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
       $data->user()->currentAccessToken()->delete();
    }
}
