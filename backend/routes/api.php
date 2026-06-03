<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;

Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'Laravel Backend Connected'
    ]);
});

Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);