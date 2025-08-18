<?php

namespace App\Services;

class UserValidationService
{
    public function validateRegister(array $data)
    {
        return validator($data, [
            'name' => 'required|string|max:255|regex:/^[a-zA-Zа-яА-Я\s]+$/',
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
            'email'    => 'required_without:token|string|email|max:255',
            'password' => 'required_with:email|string|min:8|max:255',
            'token'    => ['required_without:email','string'],
        ])->validate();
    }

    public function validateToken(array $data)
    {
        return validator($data, [
'token' => ['sometimes', 'string']
       ])->validate();
    }
}
