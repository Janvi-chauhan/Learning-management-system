<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
    public function index()
    {
        return User::where('role', 'student')->get();
    }

    public function show($id)
    {
        return User::findOrFail($id);
    }

    public function store(Request $request)
    {
        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password ?? '123456'),

            'role' => 'student',

            'course' => $request->course,
            'year' => $request->year,
            'batch_type' => $request->batchType,
            'status' => $request->status,

            'attendance' => $request->attendance,

            'assignments_completed' =>
                $request->assignmentsCompleted ?? 0,

            'total_assignments' =>
                $request->totalAssignments ?? 20,

            'tests_completed' =>
                $request->testsCompleted ?? 0,

            'total_tests' =>
                $request->totalTests ?? 5,
        ]);
    }

    public function update(Request $request, $id)
    {
        $student = User::findOrFail($id);

        $student->update([
            'name' => $request->name,
            'email' => $request->email,

            'course' => $request->course,
            'year' => $request->year,
            'batch_type' => $request->batchType,
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

        return response()->json([
            'message' => 'Student updated successfully'
        ]);
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Student deleted successfully'
        ]);
    }
}