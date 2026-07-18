<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Student;

class StudentController extends Controller
{
    // ================= GET ALL STUDENTS =================

    public function index()
    {
        return response()->json(
            User::where('role', 'student')->latest()->get()
        );
    }

    // ================= GET SINGLE STUDENT =================

    public function show($id)
    {
        $student = User::where('role', 'student')
            ->findOrFail($id);

        return response()->json($student);
    }

    // ================= CREATE STUDENT =================

    public function store(Request $request)
    {
         
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
        ]);

        $student = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,

            'password' => Hash::make(
    filled($request->password)
        ? $request->password
        : '123456'
),
            'role' => 'student',
            
            'courses' => $request->courses,
            'year' => $request->year,
            'batch_type' => $request->batch_type,
            'status' => $request->status ?? 'active',

            'attendance' => $request->attendance ?? 0,

            'assignments_completed' =>
                $request->assignmentsCompleted ?? 0,

            'total_assignments' =>
                $request->totalAssignments ?? 20,

            'tests_completed' =>
                $request->testsCompleted ?? 0,

            'total_tests' =>
                $request->totalTests ?? 5,
        ]);
        Student::create([
    'user_id' => $student->id,
    'phone' => $student->phone,
    'courses' => $student->courses,
    'year' => $student->year,
    'batch_type' => $student->batch_type,
    'address' => $student->location,
    'image' => $student->image,
    'attendance' => $student->attendance ?? 0,
    'assignments_completed' => $student->assignments_completed ?? 0,
    'total_assignments' => $student->total_assignments ?? 20,
    'tests_completed' => $student->tests_completed ?? 0,
     'total_tests' => $student->total_tests ?? 5,
]);

        return response()->json([
            'success' => true,
            'message' => 'Student created successfully',
            'data' => $student
        ], 201);
    }

    // ================= UPDATE STUDENT =================

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
        ]);

        $student = User::where('role', 'student')
            ->findOrFail($id);

        $student->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,

            'courses' => $request->courses,
            'year' => $request->year,
            'batch_type' => $request->batch_type,
            'status' => $request->status,

            'attendance' => $request->attendance,

            'assignments_completed' =>
                $request->assignmentsCompleted,

            'total_assignments' =>
                $request->totalAssignments,

            'tests_completed' =>
                $request->testsCompleted,

            'total_tests' =>
                $request->totalTests,
        ]);
        $studentRecord = Student::where('user_id', $student->id)->first();

if ($studentRecord) {

    $studentRecord->update([

        'phone' => $student->phone,

        'courses' => $student->courses,

        'year' => $student->year,

        'batch_type' => $student->batch_type,

        'address' => $student->location,

        'image' => $student->image,

        'attendance' => $student->attendance ?? 0,

        'assignments_completed' => $student->assignments_completed ?? 0,

        'total_assignments' => $student->total_assignments ?? 20,

        'tests_completed' => $student->tests_completed ?? 0,

        'total_tests' => $student->total_tests ?? 5,

    ]);

}

        return response()->json([
            'success' => true,
            'message' => 'Student updated successfully',
            'data' => $student
        ]);
    }

    // ================= DELETE STUDENT =================

    public function destroy($id)
    {
        $student = User::where('role', 'student')
            ->findOrFail($id);

        $student->delete();

        return response()->json([
            'success' => true,
            'message' => 'Student deleted successfully'
        ]);
    }
}