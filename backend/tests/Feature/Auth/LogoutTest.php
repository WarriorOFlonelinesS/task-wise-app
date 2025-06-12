<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class LogoutTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_logout_successfully()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/logout');

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Goodbye! Your tasks will be waiting 📝'
        ]);
    }

    /** @test */
    public function it_handles_fake_token_gracefully()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer fake_token_123456789',
        ])->postJson('/api/logout');

        $response->assertStatus(401);
        $response->assertJson([
            'message' => 'Unauthenticated.'
        ]);
    }

    /** @test */
    public function it_handles_expired_token_gracefully()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token', ['*'], now()->subDay());
        
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token->plainTextToken,
        ])->postJson('/api/logout');

        $response->assertStatus(401);
        $response->assertJson([
            'message' => 'Unauthenticated.'
        ]);
    }

    /** @test */
    public function it_handles_malformed_token_gracefully()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer not.a.valid.token.format',
        ])->postJson('/api/logout');

        $response->assertStatus(401);
        $response->assertJson([
            'message' => 'Unauthenticated.'
        ]);
    }

    /** @test */
    public function it_handles_missing_token_gracefully()
    {
        $response = $this->postJson('/api/logout');

        $response->assertStatus(401);
        $response->assertJson([
            'message' => 'Unauthenticated.'
        ]);
    }
} 