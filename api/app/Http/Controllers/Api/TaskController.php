<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks, 200);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'min:8', 'max:255'],
            'description' => 'nullable|string',
            'color' => 'nullable|string',
        ]);
        $task = Task::create($request->all() + ['user_id' => auth()->user()->id]);
        return response()->json($task, 200);
    }
    public function update(Request $request, Task $task)
    {
        $request->validate([
            'name' => ['required', 'string', 'min:8', 'max:255'],
            'description' => 'nullable|string',
            'color' => 'nullable|string',
        ]);
        $task->update($request->all());
    }
    public function destroy(Task $task)
    {
        if ($task->delete()) {
            return response()->json([
                "success" => true,
                "message" => "Task deleted successfully."
            ], 200);
        }
    }
    public function show(Task $task)
    {
        return response()->json($task, 200);
    }
}
