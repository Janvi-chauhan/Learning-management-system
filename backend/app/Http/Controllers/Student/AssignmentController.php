<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Assignment;
use App\Models\AssignmentSubmission;

class AssignmentController extends Controller
{
   public function index(Request $request)
{
    $student = $request->user();

    $assignments = Assignment::latest()->get();

    $assignments->transform(function ($assignment) use ($student) {

        $submission =
        AssignmentSubmission::where(
            'assignment_id',
            $assignment->id
        )
        ->where(
            'student_id',
            $student->id
        )
        ->first();

        if (!$submission) {

            $status = "Not Submitted";

        } elseif ($submission->status == "Submitted") {

            $status = "Pending";

        } elseif ($submission->status == "Approved") {

            $status = "Submitted";

        } else {

            $status = "Rejected";

        }

        return [

            'id' => $assignment->id,

            'title' => $assignment->title,

            'course' => $assignment->course,

            'due_date' => $assignment->due_date,

            'submission_status' => $status,
            'progress' =>

        $status == "Submitted"
            ? 100

        : ($status == "Pending"
            ? 50

        : 0)
        ];

    });

    return response()->json([

        'success' => true,

        'data' => $assignments

    ]);
}
    public function stats(Request $request)
{
    $student = $request->user();

    $totalAssignments = Assignment::count();

   $completedAssignments =
AssignmentSubmission::where(
    'student_id',
    $student->id
)
->where(
    'status',
    'Approved'
)
->count();

    $pendingAssignments = $totalAssignments - $completedAssignments;

    $upcomingAssignments = Assignment::where(
        'due_date',
        '>=',
        now()->toDateString()
    )->count();

    return response()->json([
        'success' => true,
        'data' => [
            'assignments' => $totalAssignments,
            'pending' => $pendingAssignments,
            'completed' => $completedAssignments,
            'upcoming' => $upcomingAssignments
        ]
    ]);
}
}