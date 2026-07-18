<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Assignment;
use App\Models\AssignmentSubmission;

class TeacherAssignmentController extends Controller
{
    // Get all assignments
  public function index()
{
    $studentCount = \App\Models\User::where('role', 'student')->count();

    $assignments = Assignment::withCount('submissions')
        ->latest()
        ->get();

    foreach ($assignments as $assignment) {

        if ($studentCount > 0) {

            $assignment->progress =
                round(
                    ($assignment->submissions_count / $studentCount) * 100
                );

        } else {

            $assignment->progress = 0;

        }
    }

    return response()->json([
        'success' => true,
        'data' => $assignments
    ]);
}
    public function stats()
{
    $totalAssignments = Assignment::count();

    $totalSubmissions = AssignmentSubmission::count();

    $totalQuestions = 0;

    $totalStudents = AssignmentSubmission::distinct('student_id')->count('student_id');

    return response()->json([
        'success' => true,
        'data' => [
            'assignments' => $totalAssignments,
            'submissions' => $totalSubmissions,
            'questions' => $totalQuestions,
            'students' => $totalStudents,
        ]
    ]);
}

    // Create assignment
    public function store(Request $request)
    {
        $assignment = Assignment::create([
            'title' => $request->title,
            'course' => $request->course,
            'due_date' => $request->due_date,
            'status' => 'Pending',
            'teacher_id' => auth()->id()
        ]);

        return response()->json([
            'success' => true,
            'data' => $assignment
        ]);
    }

    // Show submissions of a particular assignment
    public function submissions($id)
    {
        $submissions = AssignmentSubmission::where(
            'assignment_id',
            $id
        )
        ->with('student')
        ->latest()
        ->get();

        return response()->json([
            'success' => true,
            'data' => $submissions
        ]);
    }

    // Approve submission
    public function approve($id)
    {
        $submission =
            AssignmentSubmission::findOrFail($id);

        $submission->status = 'Approved';

        $submission->save();

        return response()->json([
            'success' => true,
            'message' => 'Submission Approved'
        ]);
    }

    // Reject submission
    public function reject($id)
    {
        $submission =
            AssignmentSubmission::findOrFail($id);

        $submission->status = 'Rejected';

        $submission->save();

        return response()->json([
            'success' => true,
            'message' => 'Submission Rejected'
        ]);
    }
}