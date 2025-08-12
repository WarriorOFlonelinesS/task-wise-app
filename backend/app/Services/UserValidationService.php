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

            ],
            'password_confirmation' => 'required|same:password',
        ], [
            'name.regex' => 'Name can only contain letters and spaces.',
        ])->validate();
    }

    public function validateLogin(array $data)
    {
        return validator($data, [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ])->validate();
    }
}
