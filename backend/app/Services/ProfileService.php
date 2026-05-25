<?php

namespace App\Services;

use App\DTO\UserDTO;
use App\Models\User;

class ProfileService
{
    public function getProfileData(string $id)
    {
        $profile = User::where('id', auth()->user()->id)
            ->where('id', $id)
            ->firstOrFail();

        return $profile;
    }

    public function updateProfileData(UserDTO $dto, string $id)
    {
        $profile = User::where('id', auth()->user()->id)
            ->where('id', $id)
            ->firstOrFail();

        $profile->update(['name' => $dto->name, 'avatar_url' => $dto->avatarUrl]);

        return $profile;
    }

    public function deleteProfileData(string $id)
    {
        $profile = User::where('id', auth()->user()->id)
            ->where('id', $id)
            ->firstOrFail();

        $profile->delete();
    }
}
