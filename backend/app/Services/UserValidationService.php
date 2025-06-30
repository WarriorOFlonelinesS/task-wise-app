<?php

namespace App\Services;

class UserValidationService
{
    public function validateRegister(array $data)
    {
        return validator($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ])->validate();
    }

    public function validateLogin(array $data)
    {
        return validator($data, [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ])->validate();
    }
}