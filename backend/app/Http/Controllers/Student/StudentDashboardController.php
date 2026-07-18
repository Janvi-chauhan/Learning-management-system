<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Assignment;
use App\Models\Payment;
use App\Models\StudentCourse;

class StudentDashboardController extends Controller
{
    public function stats()
    {
        $totalCourses =
            StudentCourse::count();

        $completedAssignments =
            Assignment::count();

        $totalProjects =
            Project::count();

        $totalPayments =
            Payment::sum('amount');

        return response()->json([
            'success' => true,

            'data' => [

                // CARDS

                'totalCourses' =>
                    $totalCourses,

                'completedAssignments' =>
                    $completedAssignments,

                'totalProjects' =>
                    $totalProjects,

                'totalPayments' =>
                    $totalPayments,

                // PROGRESS BARS

                'courseProgress' =>
                    min($totalCourses * 10, 100),

                'assignmentProgress' =>
                    min($completedAssignments * 20, 100),

                'projectProgress' =>
                    round(
                        Project::avg('progress') ?? 0
                    ),

                'paymentProgress' =>
                    $totalPayments > 0
                        ? 100
                        : 0,
            ]
        ]);
    }

    public function activities()
    {
        return response()->json([
            'success' => true,

            'data' => [

                [
                    'title' =>
                        'Assignments Completed',

                    'time' =>
                        now()->format('d M Y'),

                    'status' =>
                        'Completed',

                    'type' =>
                        'assignment'
                ],

                [
                    'title' =>
                        'Projects Created',

                    'time' =>
                        now()->format('d M Y'),

                    'status' =>
                        'Active',

                    'type' =>
                        'project'
                ],

                [
                    'title' =>
                        'Courses Enrolled',

                    'time' =>
                        now()->format('d M Y'),

                    'status' =>
                        'Learning',

                    'type' =>
                        'course'
                ]
            ]
        ]);
    }
}