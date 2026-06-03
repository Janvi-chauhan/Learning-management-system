<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;

class AdminController extends Controller
{
    public function dashboard()
    {
        return response()->json([
            'success' => true,

            'data' => [
                'totalTeachers' =>
                    User::where('role', 'teacher')->count(),

                'totalStudents' =>
                    User::where('role', 'student')->count(),

                'totalCourses' =>
                    Course::count()
            ]
        ]);
    }
}