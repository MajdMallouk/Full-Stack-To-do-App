<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use function Pest\Laravel\get;
use function Pest\Laravel\postJson;
use function Pest\Laravel\getJson;
use function Pest\Laravel\putJson;
use function Pest\Laravel\deleteJson;

uses(RefreshDatabase::class);

beforeEach(function () {
    get('/sanctum/csrf-cookie');
    $this->user = User::factory()->create([
        'password' => bcrypt('secret123'),
    ]);
});

it('registers a new user via the API', function () {
    postJson('/api/register', [
        'name'                  => 'New Pest User',
        'email'                 => 'new@example.com',
        'password'              => 'secret123',
        'password_confirmation' => 'secret123',
    ])
        ->assertCreated()
        ->assertJsonStructure([
            'user' => ['id', 'name', 'email'],
            'token',
        ]);

});

it('requires authentication on todos endpoints', function () {
    getJson('/api/todos')->assertUnauthorized();
    postJson('/api/todos', ['title' => 'foo'])->assertUnauthorized();
});

it('can create a todo', function () {
    Sanctum::actingAs($this->user);

    postJson('/api/todos', ['title' => 'Write Pest tests'])
        ->assertCreated()
        ->assertJsonStructure(['id', 'title'])
        ->assertJsonFragment(['title' => 'Write Pest tests']);

    $this->assertDatabaseHas('todos', [
        'title'        => 'Write Pest tests',
        'is_completed' => false,
    ]);
});

it('can update a todo', function () {
    Sanctum::actingAs($this->user);

    $todo = $this->user->todos()->create(['title' => 'Initial']);

    putJson("/api/todos/{$todo->id}", ['is_completed' => true])
        ->assertOk()
        ->assertJsonFragment(['is_completed' => true]);

    $this->assertDatabaseHas('todos', [
        'id'           => $todo->id,
        'is_completed' => true,
    ]);
});

it('can delete a todo', function () {
    Sanctum::actingAs($this->user);

    $todo = $this->user->todos()->create(['title' => 'Throw away']);

    deleteJson("/api/todos/{$todo->id}")
        ->assertNoContent();

    $this->assertDatabaseMissing('todos', ['id' => $todo->id]);
});
