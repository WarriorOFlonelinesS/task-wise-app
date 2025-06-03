<?php

namespace App\Services;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{   
    public function createUser($data){
        $data->validate(
            [
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6'
            ]
            );
        return User::create([
            'name' => $data->name,
            'email' => $data->email,
            'password' => bcrypt($data->password)
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
        return response()->json(['user' => $user, 'token'=>$token]);
    }

    public function logoutUser($data){
        $data->user()->currentAccessToken()->delete();
    }
}
