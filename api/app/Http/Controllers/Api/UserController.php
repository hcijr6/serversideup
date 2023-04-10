<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $usersQuery = User::where('id', '>', 0);
        $pagination = 15;
        if ($request->has('pagination')) {
            $pagination = $request->pagination;
        }
        if ($request->has('filters')) {
            $filters = $request->filters;
            foreach ($filters as $key => $filter) {
                if ($filter) {
                    switch ($filter['type']) {
                        case 'LIKE':
                            $usersQuery->where($filter["field"], 'LIKE', $filter["content"]);
                            break;
                        case '%LIKE%':
                            $usersQuery->where($filter["field"], 'LIKE', '%' . $filter["content"] . '%');
                            break;
                        default:

                            break;
                    }
                }
            }
        }
        if ($request->has('order')) {
            $order = $request->order;
            if($order){
                $usersQuery->orderBy($order['field'], $order['direction']);
            }
        }
        return UserResource::collection($usersQuery->paginate($pagination));
    }
}
