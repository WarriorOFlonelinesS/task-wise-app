<?php

namespace App\Services;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthService
{   
    public function createUser($data){
        $data->validate(
            [
                'name' => 'required',
                'email' => 'required|email|unique:user',
                'password' => 'required|min:6'
            ]
            );
        return User::create([
            'name' => $data->name,
            'email' => $data->email,
            'password' => bcrypt($data->password)
        ])
        
    }
}
