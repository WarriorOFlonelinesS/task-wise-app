<?php

namespace App\Services;

use App\DTO\UserDTO;
use App\Models\PersonalAccessToken;
use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function createUser(UserDTO $dto)
    {
        $user = User::create([
            'name' => $dto->name,
            'email' => $dto->email,
            'password' => Hash::make($dto->password),
        ]);
      
            $token = $user->createToken('auth_token')->plainTextToken;
         
            PersonalAccessToken::create(
                [
                    'tokenable_id' => $user->id,
                   
                    'tokenable_type' => User::class,
                    'name' => 'API Token',
                    'token' => hash('sha256', $token),
                    'abilities' => json_encode(['read', 'write']),
                ]
            );

        return ['user' => $user, 'token'=>$token];
    }

    public function loginUser(UserDTO $dto)
    {
        $user = User::where('email', $dto->email)->firstOrFail();
        if (! $user || ! Hash::check($dto->password, $user->password)) {
            throw new AuthenticationException('Invalid credentials');
        }
        $token = $user->createToken('auth_token')->plainTextToken;
       
        PersonalAccessToken::create(
            [   
                'tokenable_id' => $user->id,
                'tokenable_type' => User::class,
                'name' => 'API Token',
                'token' => hash('sha256', $token),
                'abilities' => json_encode(['read', 'write']),
            ]
        );
        return ['user' => $user, 'token' => $token];
    }

    public function loginUserWithToken(UserDTO $dto){

        [$id, $token] = explode('|', $dto->token, 2);

        $hashed = hash('sha256', $token);
        $token = PersonalAccessToken::where('id', $id)->where('token', $hashed)->first();
    
        if (hash('sha256', $token)) {      
          $user = User::where('id',  $token->tokenable_id)->first();
          return ['user' => $user, 'token' => $token];
        }
        return;
    }

    public function logoutUser()
    {
        try {
            $token = auth()->user()->currentAccessToken();
            if (! $token) {
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
