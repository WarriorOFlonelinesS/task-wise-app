<?php

namespace Tests\Feature\Tasks;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UpdateTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_update_successfully()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $task = Task::factory()->create([
            'user_id' => $user->id,
            'title' => 'Finish project documentation',
            'description' => 'Complete the README and API docs    release.',
        ]);

        $response = $this->putJson('/api/tasks/'."$task->id",
            [
                'title' => 'Updated Title',
                'description' => 'Complete the README and API docs for the new release.',
            ]
        );

        $response->assertStatus(200);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Updated Title',
        ]);
    }

    /** @test */
    public function user_update_task_without_authorization()
    {
        $user = User::factory()->create();

        $task = Task::factory()->create([
            'user_id' => $user->id,
            'title' => 'Finish project documentation',
            'description' => 'Complete the README and API docs    release.',
        ]);

        $response = $this->putJson('/api/tasks/'."$task->id",
            [
                'title' => 'Updated Title',
                'description' => 'Complete the README and API docs for the new release.',
            ]
        );

        $response->assertStatus(401);

    }

    /** @test */
    public function user_update_task_without_parameters()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $task = Task::factory()->create([
            'user_id' => $user->id,
            'title' => 'Finish project documentation',
            'description' => 'Complete the README and API docs    release.',
        ]);

        $response = $this->putJson('/api/tasks/'."$task->id", []
        );

        $response->assertStatus(500);
    }
}
