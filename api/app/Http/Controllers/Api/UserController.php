<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
    public function show(Request $request)
    {
        return response()->json($request->user());
    }
    public function getTable(Request $request)
    {   
        return UserResource::collection(User::paginate($request->pagination));
    }
}
