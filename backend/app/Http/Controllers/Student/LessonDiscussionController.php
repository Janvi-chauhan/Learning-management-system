<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LessonDiscussion;
use App\Models\Student;

class LessonDiscussionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([

            'lesson_id' => 'required|exists:course_lessons,id',

            'message' => 'required|string'

        ]);

        $student = Student::where(
            'user_id',
            auth()->id()
        )->first();

        LessonDiscussion::create([

            'lesson_id' => $request->lesson_id,

            'student_id' => $student->id,

            'message' => $request->message

        ]);

        return response()->json([

            'success' => true,

            'message' => 'Question posted.'

        ]);
    }
}