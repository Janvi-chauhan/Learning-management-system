<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Query;
use Illuminate\Http\Request;

class QueryController extends Controller
{
    public function store(Request $request)
{
        $request->validate([
        'query' => 'required|string'
    ]);
//     // return response()->json([
//     // 'user' => auth()->user(),
//     // 'user_id' => auth()->id()
// // ]);

    $query = Query::create([
        'student_id' => auth()->id(),
        'query' => $request->input('query'),
        'status' => 'Pending'
    ]);
     return response()->json([
        'success' => true,
        'message' => 'Query Raised Successfully',
        'data'    => $query
    ]);
}

    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Query::where(
                'student_id',
                auth()->id()
            )->latest()->get()
        ]);
    }
}