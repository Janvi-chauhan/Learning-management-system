<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;

class DashboardController extends Controller
{
    public function stats()
    {
        $totalTeachers = User::where('role', 'teacher')->count();

        $totalStudents = User::where('role', 'student')->count();

        $totalCourses = Course::count();

        return response()->json([
            'success' => true,
            'data' => [
                'total_teachers' => $totalTeachers,
                'total_students' => $totalStudents,
                'total_courses' => $totalCourses,
            ]
        ]);
    }
}