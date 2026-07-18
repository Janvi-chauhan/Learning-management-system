<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Query;
use Illuminate\Http\Request;

class TeacherQueryController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Query::latest()->get()
        ]);
    }

    public function answer(Request $request, $id)
    {
        $request->validate([
            'answer' => 'required|string'
        ]);

        $query = Query::findOrFail($id);

        $query->answer = $request->answer;

        $query->status = 'Answered';

        $query->save();

        return response()->json([
            'success' => true,
            'message' => 'Answer Submitted',
            'data' => $query
        ]);
    }
}