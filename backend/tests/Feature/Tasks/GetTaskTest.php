<?php

namespace Tests\Feature\Tasks;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class GetTaskTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_get_tasks_successfully()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $task = Task::factory()->create([
            'user_id' => $user->id,
            'title' => 'Finish project documentation',
            'description' => 'Complete the README and API docs for release.',
        ]);

        $response = $this->getJson("/api/tasks/$task->id");

        $response->assertStatus(200);
    }

    /** @test */
    public function user_response_undefined_task()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $task = Task::factory()->create([
            'user_id' => $user->id,
            'title' => 'Finish project documentation',
            'description' => 'Complete the README and API docs for release.',
        ]);

        $response = $this->getJson('/api/tasks/111');

        $response->assertStatus(404);
    }

    /** @test */
    public function user_get_task_without_authorization()
    {
        $user = User::factory()->create();

        $task = Task::factory()->create([
            'user_id' => $user->id,
            'title' => 'Finish project documentation',
            'description' => 'Complete the README and API docs for release.',
        ]);

        $response = $this->getJson("/api/tasks/$task->id");

        $response->assertStatus(401);
    }

    /** @test */
    public function user_get_task_with_invalid_format_of_id()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        
        $task = Task::factory()->create([
            'user_id' => $user->id,
            'title' => 'Finish project documentation',
            'description' => 'Complete the README and API docs for release.',
        ]);

        $response = $this->getJson('/api/tasks/user');

        $response->assertStatus(404);
    }
}
