<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CreateTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_create_successfully()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/tasks',
            ['title' => 'Finish project documentation',
                'description' => 'Complete the README and API docs for the new release.']
        );

        $response->assertStatus(201);
    }

    /** @test */
    public function user_create_tasks_without_authorization()
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/tasks',
            ['title' => 'Finish project documentation',
                'description' => 'Complete the README and API docs for the new release.']
        );

        $response->assertStatus(401);
    }

    /** @test */
    public function user_create_tasks_without_parametrs()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/tasks',
            []
        );

        $response->assertStatus(422);
    }
}
