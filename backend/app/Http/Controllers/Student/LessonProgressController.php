<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LessonProgress;
use App\Models\Student;
use Carbon\Carbon;

class LessonProgressController extends Controller
{
    public function markComplete(Request $request)
{
    $request->validate([
        'lesson_id' => 'required|exists:course_lessons,id',
    ]);

    // Logged in user
    $userId = auth()->id();

    // Find student row
    $student = \App\Models\Student::where('user_id', $userId)->first();

    if (!$student) {
        return response()->json([
            'success' => false,
            'message' => 'Student record not found.'
        ], 404);
    }

    $progress = \App\Models\LessonProgress::updateOrCreate(

        [
            'student_id' => $student->id,
            'lesson_id'  => $request->lesson_id,
        ],

        [
            'completed'   => true,
            'completed_at'=> now(),
        ]
    );

    return response()->json([
        'success' => true,
        'data'    => $progress
    ]);
}
}