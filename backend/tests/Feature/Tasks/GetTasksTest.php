<?php

namespace Tests\Feature\Auth;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class GetTasksTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_get_tasks_successfully()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        Task::insert([
            [
                'user_id' => $user->id,
                'title' => 'Task 1',
                'description' => 'Desc 1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Task 2',
                'description' => 'Desc 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $response = $this->getJson('/api/tasks/'
        );

        $response->assertStatus(200);

        $this->assertDatabaseHas('tasks', [
            'user_id' => $user->id,
            'title' => 'Task 1',
            'description' => 'Desc 1',
        ]);
        $this->assertDatabaseHas('tasks', [
            'user_id' => $user->id,
            'title' => 'Task 2',
            'description' => 'Desc 2',
        ]);
    }

    /** @test */
    public function user_get_tasks_without_autorizathon()
    {
        $user = User::factory()->create();

        Task::insert([
            [
                'user_id' => $user->id,
                'title' => 'Task 1',
                'description' => 'Desc 1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Task 2',
                'description' => 'Desc 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $response = $this->getJson('/api/tasks/');

        $response->assertStatus(401);
    }

    /** @test */
    public function user_get_tasks_from_empty_db()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/tasks/');

        $response->assertStatus(200);
    }

    /** @test */
    public function test_server_error_when_getting_tasks()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $mock = \Mockery::mock(\App\Services\TaskService::class);
        $mock->shouldReceive('showTasks')->andThrow(new \Exception('DB error'));
        $this->app->instance(\App\Services\TaskService::class, $mock);

        $response = $this->getJson('/api/tasks/');

        $response->assertStatus(500);
        $response->assertJson(['error' => 'Failed to get tasks']);
    }
}
