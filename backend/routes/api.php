<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Authentication\AuthController;

/*
|--------------------------------------------------------------------------
| Test API
|--------------------------------------------------------------------------
*/

Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'Laravel Backend Connected'
    ]);
});

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', [AuthController::class, 'user']);
});

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

Route::get(
    '/admin/dashboard',
    [DashboardController::class, 'stats']
);

/*
|--------------------------------------------------------------------------
| Teachers Management
|--------------------------------------------------------------------------
*/

Route::get(
    '/admin/teachers',
    [TeacherController::class, 'index']
);

Route::post(
    '/admin/teachers',
    [TeacherController::class, 'store']
);

Route::get(
    '/admin/teachers/{id}',
    [TeacherController::class, 'show']
);

Route::put(
    '/admin/teachers/{id}',
    [TeacherController::class, 'update']
);

Route::delete(
    '/admin/teachers/{id}',
    [TeacherController::class, 'destroy']
);

/*
|--------------------------------------------------------------------------
| Students Management
|--------------------------------------------------------------------------
*/

Route::get(
    '/admin/students',
    [StudentController::class, 'index']
);

Route::post(
    '/admin/students',
    [StudentController::class, 'store']
);

Route::get(
    '/admin/students/{id}',
    [StudentController::class, 'show']
);

Route::put(
    '/admin/students/{id}',
    [StudentController::class, 'update']
);

Route::delete(
    '/admin/students/{id}',
    [StudentController::class, 'destroy']
);

/*
|--------------------------------------------------------------------------
| Courses Management
|--------------------------------------------------------------------------
*/

Route::get(
    '/admin/courses',
    [CourseController::class, 'index']
);

Route::post(
    '/admin/courses',
    [CourseController::class, 'store']
);

Route::get(
    '/admin/courses/{id}',
    [CourseController::class, 'show']
);

Route::put(
    '/admin/courses/{id}',
    [CourseController::class, 'update']
);

Route::delete(
    '/admin/courses/{id}',
    [CourseController::class, 'destroy']
);