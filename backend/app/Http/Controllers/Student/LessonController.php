<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LessonCompletion;
use App\Models\LessonProgress;
use Carbon\Carbon;
use App\Models\Student;

class LessonController extends Controller
{
    public function complete(Request $request)
{
    $student = auth()->user()->student;

    LessonProgress::updateOrCreate(

        [
            'student_id' => $student->id,
            'lesson_id' => $request->lesson_id,
        ],

        [
            'completed' => true,
            'completed_at' => Carbon::now(),
        ]

    );

    return response()->json([
        'success' => true,
    ]);
}
}