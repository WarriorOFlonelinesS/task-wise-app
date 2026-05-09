<?php

namespace App\DTO;

class UserDTO
{
    public $name;

    public $email;

    public $password;

    public $password_confirmation;

<<<<<<< HEAD
=======
    public $token;

    public $avatarUrl;

>>>>>>> frontend/profile
    public function __construct(array $data)
    {
        $this->name = $data['name'] ?? null;
        $this->email = $data['email'] ?? null;
        $this->password = $data['password'] ?? null;
        $this->password_confirmation = $data['password_confirmation'] ?? null;
<<<<<<< HEAD
=======
        $this->token = isset($data['token']) ? $data['token'] : null;
        $this->avatarUrl = isset($data['avatar_url']) ? $data['avatar_url'] : null;
>>>>>>> frontend/profile
    }
}
