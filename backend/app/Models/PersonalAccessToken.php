<?php

namespace App\Models;

use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

class PersonalAccessToken extends SanctumPersonalAccessToken
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'personal_access_tokens';
}
