<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\CourseController;

Route::prefix('admin')->group(function () {

    Route::get('/dashboard',
        [AdminController::class, 'dashboard']);

    Route::apiResource(
        'teachers',
        TeacherController::class
    );

    Route::apiResource(
        'students',
        StudentController::class
    );

    Route::apiResource(
        'courses',
        CourseController::class
    );
});