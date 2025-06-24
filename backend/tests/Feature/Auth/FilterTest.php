<?php

namespace Tests\Feature\Auth;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class FilterTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_filter_successfully()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $task = Task::factory()->create([
            "user_id" => $user->id,
            "title" => "Finish project documentation",
            "description" => "Complete the README and API docs for the new release.",
        ]);

        $response = $this->getJson('/api/tasks/filter?id=' . $task->id);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            "task" => [
                [
                    "id",
                    "user_id",
                    "title",
                    "description",
                    "created_at",
                    "updated_at",
                ]
            ]
        ]);
    }

} 