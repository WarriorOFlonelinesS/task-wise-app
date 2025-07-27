<?php

namespace Tests\Feature\Tasks;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class DeleteTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_delete_successfully()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $task = Task::factory()->create([
            'user_id' => $user->id,
            'title' => 'Finish project documentation',
            'description' => 'Complete the README and API docs for the new release.',
        ]);

        $response = $this->deleteJson('/api/tasks/'.$task->id);

        $response->assertStatus(202);
        $response->assertJson([
            'message' => 'Task deleted successfully',
        ]);
    }

    /** @test */
    public function user_delete_without_autoriziathion()
    {
        $user = User::factory()->create();

        $task = Task::factory()->create([
            'user_id' => $user->id,
            'title' => 'Finish project documentation',
            'description' => 'Complete the README and API docs for the new release.',
        ]);

        $response = $this->deleteJson('/api/tasks/'.$task->id);

        $response->assertStatus(401);
    }

    /** @test */
    public function user_delete_without_id()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $task = Task::factory()->create([
            'user_id' => $user->id,
            'title' => 'Finish project documentation',
            'description' => 'Complete the README and API docs for the new release.',
        ]);

        $response = $this->deleteJson('/api/tasks/');

        $response->assertStatus(500);
    }
}
