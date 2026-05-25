<?php

namespace App\Http\Controllers;

use App\DTO\UserDTO;
use App\Services\ProfileService;
use App\Services\UserValidationService;
use Illuminate\Http\Request;

class ProfileController
{
    protected UserValidationService $validation;

    protected Request $request;

    protected ProfileService $profileService;

    public function __construct(Request $request, ProfileService $profileService, UserValidationService $validation)
    {
        $this->request = $request;
        $this->profileService = $profileService;
        $this->validation = $validation;
    }

    public function show(string $id)
    {
        $profile = $this->profileService->getProfileData($id);

        return ['profile' => $profile];
    }

    public function update(string $id)
    {
        $validData = $this->validation->validateProfileData($this->request->all());
        $dto = new UserDTO($validData);
        $profileData = $this->profileService->updateProfileData($dto, $id);

        return response()->json([
            'profile' => $profileData,
            'message' => 'Profile updated!',
        ], 200);
    }

    public function destroy(string $id)
    {
        $this->profileService->deleteProfileData($id);

        return response()->json([
            'message' => 'Profile deleted successfully',
        ], 202);
    }
}
