<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AssignmentSubmission;

class AssignmentSubmissionController extends Controller
{
    public function store(Request $request)
    {
       $request->validate([
    'assignment_id' => 'required',
    'file' => 'required|file'
]);
   
        // Logged-in Student
        $student = auth()->user();
        $path = $request
            ->file('file')
            ->store(
                'submissions',
                'public'
            );

        try {
    
    $submission =
    AssignmentSubmission::create([
        'assignment_id' =>
            $request->assignment_id,

        'student_id' => $student->id,

        'file' => $path,

        'status' =>
            'Submitted'
    ]);

    return response()->json([
        'success' => true,
        'message' =>
            'File uploaded successfully',
        'data' => $submission
    ]);

} catch (\Exception $e) {

    return response()->json([
        'error' =>
            $e->getMessage()
    ], 500);

}

        return response()->json([
            'success' => true,
            'message' => 'File uploaded successfully',
            'data' => $submission
        ]);
    }
}