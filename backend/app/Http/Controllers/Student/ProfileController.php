<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StudentCourse;
use App\Models\AssignmentSubmission;
use App\Models\Certificate;
use App\Models\Student;


class ProfileController extends Controller
{
    public function index(Request $request)
{
    $student = $request->user();

    $totalCourses = StudentCourse::where(
        'student_id',
        $student->id
    )->count();

    $totalCertificates = Certificate::where(
        'student_id',
        $student->id
    )->count();

    $totalAssignments =
        AssignmentSubmission::where(
            'student_id',
            $student->id
        )->count();

    $completedAssignments =
        AssignmentSubmission::where(
            'student_id',
            $student->id
        )
        ->where('status', 'Approved')
        ->count();

    $attendance =
        $totalAssignments > 0
            ? round(
                ($completedAssignments /
                    $totalAssignments) * 100
            )
            : 0;

    return response()->json([
        'success' => true,

        'data' => [

            'user' => $student,

            'stats' => [

                'courses' => $totalCourses,

                'certificates' =>
                    $totalCertificates,

                'attendance' =>
                    $attendance
            ]
        ]
    ]);
}
    // public function index()
    // {
    //     return response()->json([
    //         'success' => true,
    //         'data' => auth()->user()
    //     ]);
    // }

    public function update(Request $request)
{
    $user = $request->user();

    $validated = $request->validate([

        'name' => 'required|string|max:255',

        'email' => 'required|email',

        'phone' => 'nullable|string|max:20',

        'location' => 'nullable|string|max:255',
        'year' => 'nullable|string|max:20',

        'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
    ]);

    if ($request->hasFile('image')) {

        $path = $request->file('image')->store(
            'profile-images',
            'public'
        );

        $user->image = $path;
    }

    $user->name = $validated['name'];

    $user->email = $validated['email'];

    $user->phone = $validated['phone'] ?? null;

    $user->location = $validated['location'] ?? null;
    $user->year = $validated['year'] ?? null;

    $user->save();
    $student = Student::where('user_id', $user->id)->first();

if ($student) {

    $student->phone = $user->phone;

    $student->courses = $user->courses;

    $student->address = $user->location;

    $student->year = $user->year;

    if ($request->hasFile('image')) {
        $student->image = $user->image;
    }

    $student->save();
}

    return response()->json([

        'success' => true,

        'message' => 'Profile Updated Successfully',

        'user' => $user
    ]);
}
}