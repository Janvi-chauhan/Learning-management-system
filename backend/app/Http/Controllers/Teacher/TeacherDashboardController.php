<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;

use App\Models\User;
use App\Models\Course;
use App\Models\Assignment;
use App\Models\Project;

class TeacherDashboardController extends Controller
{
    public function stats()
    {
        $totalCourses =
            Course::count();

        $totalAssignments =
            Assignment::count();

        $totalStudents =
            User::where(
                'role',
                'student'
            )->count();

        $totalProjects =
            Project::count();

        $completedProjects =
            Project::where(
                'status',
                'Completed'
            )->count();

        $performance =
            $totalProjects > 0
                ? round(
                    ($completedProjects / $totalProjects) * 100
                )
                : 0;

        return response()->json([
            'success' => true,

            'data' => [

                'totalCourses' =>
                    $totalCourses,

                'totalAssignments' =>
                    $totalAssignments,

                'totalStudents' =>
                    $totalStudents,

                'performance' =>
                    $performance,
                
                'courseProgress' =>
                   min($totalCourses * 10, 100),

                'assignmentProgress' =>
                    min($totalAssignments * 10, 100),
         
                 'studentProgress' =>
                     min($totalStudents * 2, 100),

                 'performanceProgress' =>
                     $performance,
            ]
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Activities
    |--------------------------------------------------------------------------
    */

    public function activities()
    {
        return response()->json([
            'success' => true,

            'data' => [

                [
                    'title' =>
                        'Assignments Reviewed',

                    'time' =>
                        now()->format('d M Y'),

                    'status' =>
                        'Reviewed',

                    'type' =>
                        'assignment'
                ],

                [
                    'title' =>
                        'Students Active',

                    'time' =>
                        now()->format('d M Y'),

                    'status' =>
                        'Live',

                    'type' =>
                        'student'
                ],

                [
                    'title' =>
                        'Courses Managed',

                    'time' =>
                        now()->format('d M Y'),

                    'status' =>
                        'Running',

                    'type' =>
                        'course'
                ]
            ]
        ]);
    }
}