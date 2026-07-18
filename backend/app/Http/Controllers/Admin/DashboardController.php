<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Assignment;
use App\Models\Project;
use App\Models\StudentCourse;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'success' => true,

            'data' => [

                'totalCourses' =>
                    StudentCourse::count(),

                'completedAssignments' =>
                    Assignment::where(
                        'status',
                        'Completed'
                    )->count(),

                'totalProjects' =>
                    Project::count(),

                'totalPayments' =>
                    Payment::sum('amount'),
            ]
        ]);
    }
    public function chartData()
{
    $studentGrowth = [];

    for ($i = 5; $i >= 0; $i--) {

        $month = Carbon::now()
            ->subMonths($i);

        $studentGrowth[] = [
            'month' => $month->format('M'),

            'students' => User::where(
                'role',
                'student'
            )
            ->whereMonth(
                'created_at',
                $month->month
            )
            ->count()
        ];
    }

    return response()->json([
        'success' => true,

        'data' => [
            'studentGrowth' =>
                $studentGrowth
        ]
    ]);
}
public function courseDistribution()
{
    return response()->json([
        'success' => true,

        'data' => [

            [
                'name' => 'Courses',

                'value' =>
                StudentCourse::count()
            ],

            [
                'name' => 'Assignments',

                'value' =>
                Assignment::count()
            ],

            [
                'name' => 'Projects',

                'value' =>
                Project::count()
            ]
        ]
    ]);
}
public function notifications()
{
    $notifications = [];

    $newStudents = User::where(
        'role',
        'student'
    )->latest()->take(5)->get();

    foreach ($newStudents as $student) {

        $notifications[] = [
            'message' =>
                $student->name .
                ' joined LMS',
        ];
    }

    return response()->json([
    'success' => true,
    'data' => $notifications
]);
}
public function activities()
{
    $activities = [];

    // Latest Student
    $latestStudent = User::where(
        'role',
        'student'
    )->latest()->first();

    if ($latestStudent) {

        $activities[] = [
            'type' => 'student',
            'message' =>
                $latestStudent->name .
                ' joined LMS',
            'created_at' =>
                $latestStudent->created_at
                    ->diffForHumans(),
        ];
    }

    // Latest Assignment
    $latestAssignment =
        Assignment::latest()->first();

    if ($latestAssignment) {

        $activities[] = [
            'type' => 'assignment',
            'message' =>
                'Assignment "' .
                $latestAssignment->title .
                '" created',
            'created_at' =>
                $latestAssignment->created_at
                    ->diffForHumans(),
        ];
    }
    

    // Latest Project
    $latestProject =
        Project::latest()->first();

    if ($latestProject) {

        $activities[] = [
            'type' => 'project',
            'message' =>
                'Project "' .
                $latestProject->title .
                '" added',
            'created_at' =>
                $latestProject->created_at
                    ->diffForHumans(),
        ];
    }

    // Latest Course Enrollment
    $latestCourse =
        StudentCourse::latest()->first();

    if ($latestCourse) {

        $activities[] = [
            'type' => 'course',
            'message' =>
                'New course enrollment',
            'created_at' =>
                $latestCourse->created_at
                    ->diffForHumans(),
        ];
    }

    
    return response()->json([
        'success' => true,
        'data' => $activities
    ]);
}
}