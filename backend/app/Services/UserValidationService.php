<?php

namespace App\Services;

class UserValidationService
{
    public function validateRegister(array $data)
    {
        return validator($data, [
            'name' => 'required|string|max:255|regex:/^[a-zA-Z\s]+$/',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'string',
                'min:8',
                'max:255',
                'confirmed',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/',
            ],
            'password_confirmation' => 'required|same:password',
        ], [
            'password.regex' => 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
            'name.regex' => 'Name can only contain letters and spaces.',
        ])->validate();
    }

    public function validateLogin(array $data)
    {
        return validator($data, [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:1',
        ])->validate();
    }
}
