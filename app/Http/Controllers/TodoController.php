<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoStoreRequest;
use App\Http\Requests\TodoUpdateRequest;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    // GET /api/todos
    public function index(Request $request)
    {
        return $request->user()
            ->todos()
            ->orderBy('created_at', 'desc')
            ->get();
    }

    // POST /api/todos
    public function store(TodoStoreRequest $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $todo = $request->user()->todos()->create($data);

        return response()->json($todo, 201);
    }

    // PUT /api/todos/{todo}
    public function update(TodoUpdateRequest $request, Todo $todo)
    {
        // ensure ownership (if you're really you or not :)
        if ($todo->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $data = $request->validate([
            'title'        => 'sometimes|required|string|max:255',
            'is_completed' => 'sometimes|required|boolean',
        ]);

        $todo->update($data);

        return response()->json($todo);
    }

    // DELETE /api/todos/{todo}
    public function destroy(Request $request, Todo $todo)
    {
        if ($todo->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $todo->delete();

        return response()->noContent();
    }
}
