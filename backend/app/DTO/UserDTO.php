<?php
namespace App\DTO;

class UserDTO
{
    public $name;
    public $email;
    public $password;
    public $password_confirmation;

    public function __construct(array $data) {
        $this->name = $data['name'] ?? null;
        $this->email = $data['email'] ?? null;
        $this->password = $data['password'] ?? null;
        $this->password_confirmation = $data['password_confirmation'] ?? null;
    }
    
    public function validate()
    {
        return validator(
            [
                'name' => $this->name,
                'email' => $this->email,
                'password' => $this->password,
                'password_confirmation' => $this->password_confirmation,
            ],[
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
            ]
        )->validate();
    }
}